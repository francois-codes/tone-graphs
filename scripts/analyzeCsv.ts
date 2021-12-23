/// <reference types=".." />

/* eslint-disable @typescript-eslint/no-var-requires */

import fs from "fs";
import path from "path";
import * as R from "ramda";
import averagePoint from "./interpolators/averagePoint";
import {
  csvToGroupedDataPoints,
  inspect,
  countPoints,
  formatDataPoints,
  reducePoints,
  toXYPairs,
  writeFile,
} from "./utils";

const args = process.argv.slice(2);

async function run() {
  const [dataFolder] = args;
  const folderPath = path.resolve(path.join(__dirname, "..", dataFolder));
  const files = await fs.promises.readdir(folderPath);

  const csvFile = files.find((f) => f.includes(".csv"));

  const fileContent = await fs.promises.readFile(path.join(folderPath, csvFile), "utf8");

  const jsonData = R.compose(
    R.flatten,
    R.values,
    R.mapObjIndexed((points, settings) =>
      R.compose(formatDataPoints(settings), toXYPairs, averagePoint(20), reducePoints, countPoints)(points),
    ),
    csvToGroupedDataPoints,
  )(fileContent);

  await writeFile("data.json", folderPath, jsonData);
}

run();
