/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { writeFile } from "./utils";

const path = require("path");
const fs = require("fs");
const R = require("ramda");
const loess = require("./interpolators/loess").default;

const { formatDataPoints, getRelativeData, normalize, parseFile, reducePoints, toXYPairs } = require("./utils");

const args = process.argv.slice(2);

async function run() {
  const [dataFolder] = args;
  const folderPath = path.resolve(path.join(__dirname, "..", dataFolder));
  const files = await fs.promises.readdir(folderPath);
  const [pinkNoiseFile, ...plotFiles] = files.filter((f) => f.includes(".txt"));

  const pinkNoiseRawData = await parseFile(pinkNoiseFile, folderPath);

  const data = await Promise.all(
    R.map(async (fileName) => {
      const rawDataPoints = await parseFile(fileName, folderPath);

      return R.compose(
        formatDataPoints(fileName),
        toXYPairs,
        loess,
        reducePoints,
        normalize,
        getRelativeData(pinkNoiseRawData),
        R.identity,
      )(rawDataPoints);
    }, plotFiles),
  );

  const jsonData = R.flatten(data);
  await writeFile("data-loess.json", folderPath, jsonData);
}

run();

export {};
