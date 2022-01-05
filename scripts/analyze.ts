/// <reference types=".." />
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { writeFile } from "./utils";

const path = require("path");
const fs = require("fs");
const R = require("ramda");
import averagePoint from "./interpolators/averagePoint";

import {
  inspect,
  formatDataPoints,
  getRelativeData,
  normalize,
  parseFile,
  reducePoints,
  toXYPairs,
  countPoints,
} from "./utils";

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
        // toXYPairs,
        // averagePoint(5, 500),
        // reducePoints,
        countPoints,
        normalize,
        getRelativeData(pinkNoiseRawData),
      )(rawDataPoints);
    }, plotFiles),
  );

  const jsonData = R.flatten(data);
  await writeFile("data.json", folderPath, jsonData);
}

run();

export {};
