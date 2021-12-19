/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */

const path = require("path");
const fs = require("fs");

const args = process.argv.slice(2);

const getLastFolderInPath = (pathName) => {
  const pathParts = pathName.split("/");
  return pathParts[pathParts.length - 1];
};

const name = getLastFolderInPath(args[0]);

function getToneGainValue(fileName) {
  const fileWithoutExtension = fileName.split(".")[0];
  const [tone, gain] = fileWithoutExtension.split("-");

  return {
    tone: `${tone.replace("t", "")}%`,
    gain: `${gain.replace("g", "")}%`,
  };
}

const valuePoints = ["0%", "25%", "50%", "75%", "100%"];

const maxRef = valuePoints.reduce((max, value) => {
  max.push(...valuePoints.map((v) => ({ tone: value, gain: v, db: -200 })));

  return max;
}, []);

const toCsv = (data) =>
  data.map(({ frequency, db, name, tone, gain }) => `${frequency},${db},${name},${gain},${tone},`).join("\r");

async function extractDataFromFile(fileName, folderPath) {
  const filePath = path.join(folderPath, fileName);

  const fileContent = await fs.promises.readFile(filePath, "utf8");

  const lines = fileContent.split("\n");

  return lines.reduce((data, line) => {
    const [frequency, db] = line.split("\t");

    if (Number.isNaN(Number(frequency)) || Number.isNaN(Number(db))) return data;

    if (Number(frequency) > 20_000) return data;

    const dataForLine = { frequency: Number(frequency), db: Number(db) };

    if (!fileName.includes("pink noise")) {
      dataForLine.name = name;
      const { tone, gain } = getToneGainValue(fileName);
      dataForLine.tone = tone;
      dataForLine.gain = gain;
    }

    data.push(dataForLine);

    return data;
  }, []);
}

function getIndexForFrequency(frequency, data) {
  const index = data.findIndex((point) => point.frequency === frequency);

  if (index === -1) {
    throw new Error(`Could not find frequency ${frequency} in data`);
  }

  return data[index];
}

async function run() {
  const [dataFolder] = args;
  const folderPath = path.resolve(path.join(__dirname, "..", dataFolder));
  const files = await fs.promises.readdir(folderPath);
  const [pinkNoiseFile, ...plotFiles] = files.filter((f) => f.includes(".txt"));

  const pinkNoise = await extractDataFromFile(pinkNoiseFile, folderPath);

  const data = await plotFiles.reduce(async (previous, fileName) => {
    const plots = await previous;
    const plot = await extractDataFromFile(fileName, folderPath);
    plots.push(...plot);

    return plots;
  }, Promise.resolve([]));

  const relativeData = data.map((point) => {
    const relativePoint = { ...point, db: point.db - getIndexForFrequency(point.frequency, pinkNoise)?.db };

    return relativePoint;
  });

  const maxDb = relativeData.reduce((max, point) => {
    const refIndex = maxRef.findIndex((ref) => ref.tone === point.tone && ref.gain === point.gain);

    if (point.db > max[refIndex].db) {
      max[refIndex] = point;
    }

    return max;
  }, maxRef);

  const normalizedData = relativeData.map((point) => {
    const refIndex = maxDb.findIndex((ref) => ref.tone === point.tone && ref.gain === point.gain);
    const maxDbPoint = maxDb[refIndex].db;
    return { ...point, db: point.db - maxDbPoint };
  });

  console.log(JSON.stringify(normalizedData));

  // console.log(toCsv(normalizedData));
}

run();
