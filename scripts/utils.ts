import fs from "fs";
import path from "path";
import * as R from "ramda";

const LINE_BREAK = "\n";
const SLASH = "/";
const CARRIAGE_RETURN = "\r";
const TAB_BREAK = "\t";
const COMA = ",";
const PERCENT = "%";
const EMPTY_STRING = "";
const DOT = ".";
const DASH = "-";
const MAX_FREQUENCY = 20_500;
const UTF_8 = "utf8";
const PINK_NOISE_FILE_NAME = "pink noise";
const DATA_ROW_KEYS = ["frequency", "db", "tone", "gain"];
const CSV_HEADER = ["Frequency,dB,pedal,Tone,Gain"];

export function reducePoints(points: RawDataPoints): XValsAndYVals {
  return points.reduce(
    ([xval, yval], [x, y]) => {
      xval.push(x);
      yval.push(y);

      return [xval, yval];
    },
    [[], []],
  );
}

export async function parseFile(fileName: string, folderPath: string): Promise<RawDataPoints> {
  const filePath = path.join(folderPath, fileName);

  const fileContent = await fs.promises.readFile(filePath, UTF_8);

  const freqIsHigherThanMax = R.compose(R.gt(R.__, MAX_FREQUENCY), R.head);
  const hasNaNValue = R.any(Number.isNaN);

  return R.compose(
    R.reject(R.anyPass([hasNaNValue, freqIsHigherThanMax, R.propEq("0", 0)])),
    R.map(R.compose(R.map(Number), R.split(TAB_BREAK))),
    R.tail,
    R.split(LINE_BREAK),
  )(fileContent);
}

export function toCsv(data: ObjectData, name: string): string {
  return R.compose(
    R.join(CARRIAGE_RETURN),
    R.concat(CSV_HEADER),
    R.map(R.join(COMA), R.insert(2, name), R.values, R.pick(DATA_ROW_KEYS)),
  )(data);
}

function stringifyIfNeeded(data: string | unknown): string {
  return typeof data === "string" ? data : JSON.stringify(data);
}

export function writeFile(fileName: string, folderPath: string, data: string | unknown): Promise<void> {
  return fs.promises.writeFile(path.join(folderPath, fileName), stringifyIfNeeded(data));
}

const formatLabel = (prefix, value) => (value.includes("NA") ? "NA" : `${value.replace(prefix, EMPTY_STRING)}%`);

export function getToneGainValue(fileName: string): { tone: string; gain: string } {
  const fileWithoutExtension = fileName.split(DOT)[0];
  const [tone, gain] = fileWithoutExtension.split(DASH);

  return {
    tone: formatLabel("t", tone),
    gain: formatLabel("g", gain),
  };
}

export function getPedalName(pathname: string): string {
  return R.compose(R.last, R.split(SLASH))(pathname);
}

export function toXYPairs(points: XValsAndYVals): RawDataPoints {
  return R.zip(...points);
}

export const formatDataPoints = R.curry((fileName: string, datapoints: RawDataPoints): ObjectData => {
  return R.map(([frequency, db]) => {
    const dataForLine: Partial<ObjectDataRow> = { frequency: Number(frequency), db: Number(db) };

    if (!fileName.includes(PINK_NOISE_FILE_NAME)) {
      const { tone, gain } = getToneGainValue(fileName);
      dataForLine.tone = tone;
      dataForLine.gain = gain;
    }

    return dataForLine as ObjectDataRow;
  }, datapoints);
});

export function normalize(datapoints: RawDataPoints): RawDataPoints {
  const maxDb = datapoints.reduce((max, point) => (point[1] > max ? point[1] : max), -200);

  return R.map(([x, y]) => [x, y - maxDb], datapoints);
}

export const getRelativeData = R.curry((reference: RawDataPoints, datapoints: RawDataPoints): RawDataPoints => {
  return R.map(([x, y]) => {
    const refIndex = R.findIndex(([refX]) => refX === x, reference);
    return [x, y - reference[refIndex][1]];
  }, datapoints);
});

export async function extractDataFromFile(
  fileName: string,
  folderPath: string,
  pinkNoiseData: RawDataPoints,
): Promise<ObjectData> {
  const rawDataPoints = await parseFile(fileName, folderPath);
  const relativeDataPoints = getRelativeData(rawDataPoints, pinkNoiseData);
  const normalizedData = normalize(relativeDataPoints);
  const reducedNormalizedData = reducePoints(normalizedData);
  const zippedData = toXYPairs(reducedNormalizedData);

  return formatDataPoints(zippedData, fileName);
}

function getChunkSize(length) {
  if (length <= 20) return length;
  if (length <= 50) return Math.floor(length / 4);
  if (length <= 100) return Math.floor(length / 16);
  if (length <= 200) return Math.floor(length / 32);
  return Math.floor(length / 64);
}

export function countPoints(points: RawDataPoints) {
  const steps = [0, 200, 800, 2000, 5000, 10000, 20000];

  const pointsPerRange = R.groupBy(([x]) => {
    const stepIndex = R.findIndex((step) => x <= step, steps);
    return steps[stepIndex - 1];
  }, points);

  return R.compose(
    R.reduce(R.concat, []),
    R.map((range) => {
      const rangeLength = range.length;
      if (rangeLength <= 30) return range;
      const chunkSize = getChunkSize(rangeLength);
      return R.compose(R.map(R.last), R.splitEvery(chunkSize))(range);
    }),
    R.values,
  )(pointsPerRange);
}

export const inspect = (msg) => R.tap((x) => console.log(msg, x));

export function csvToGroupedDataPoints(csv: string): Record<string, RawDataPoints> {
  return R.compose(
    R.mapObjIndexed(R.map(({ frequency, db }) => [Number(frequency), Number(db)])),
    R.groupBy(R.prop("settings")),
    R.reject(({ frequency, db }) => frequency === 0 || db === 0),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    R.map(([frequency, db, _, gain, tone]) => ({
      frequency,
      db,
      settings: `t${tone?.replace(PERCENT, EMPTY_STRING) ?? "NA"}-g${gain?.replace(PERCENT, EMPTY_STRING) ?? "NA"}`,
    })),
    R.map(R.split(COMA)),
    R.split(LINE_BREAK),
  )(csv);
}
