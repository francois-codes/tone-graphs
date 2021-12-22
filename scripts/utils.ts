import fs from "fs";
import path from "path";
import * as R from "ramda";

const LINE_BREAK = "\n";
const SLASH = "/";
const CARRIAGE_RETURN = "\r";
const TAB_BREAK = "\t";
const COMA = ",";
const EMPTY_STRING = "";
const DOT = ".";
const DASH = "-";
const MAX_FREQUENCY = 20_000;
const UTF_8 = "utf8";
const PINK_NOISE_FILE_NAME = "pink noise";
const DATA_ROW_KEYS = ["frequency", "db", "tone", "gain"];
const CSV_HEADER = ["Frequency,dB,pedal,Tone,Gain"];

type RawDataPoints = [number, number][];

type XValsAndYVals = [number[], number[]];

type ObjectDataRow = {
  frequency: number;
  db: number;
  tone: string;
  gain: string;
};

type ObjectData = ObjectDataRow[];

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

const formatLabel = (prefix, value) => `${value.replace(prefix, EMPTY_STRING)}%`;

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

  // const interpolatedPoints = interpolate(lines);

  // console.log({ interpolatedPoints });

  const zippedData = toXYPairs(reducedNormalizedData);

  return formatDataPoints(zippedData, fileName);
}
