/// <reference types=".." />
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { writeFile } from "./utils";

const path = require("path");
const fs = require("fs");
const R = require("ramda");
import loess from "./interpolators/science";
import akima from "./interpolators/akima";
import cardinalSpline from "./interpolators/cardinalSpline";
import averagePoint from "./interpolators/averagePoint";

const inspect = (msg) => R.tap((x) => console.log(msg, x));

import { formatDataPoints, getRelativeData, normalize, parseFile, reducePoints, toXYPairs } from "./utils";

const args = process.argv.slice(2);

function getChunkSize(length) {
  if (length <= 20) return length;
  if (length <= 50) return Math.floor(length / 4);
  if (length <= 100) return Math.floor(length / 16);
  if (length <= 200) return Math.floor(length / 32);
  return Math.floor(length / 64);
}

function countPoints(points: RawDataPoints) {
  const steps = [0, 200, 800, 2000, 5000, 10000, 20000];

  const pointsPerRange = R.groupBy(([x, y]) => {
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
        averagePoint(20),
        reducePoints,
        countPoints,
        normalize,
        getRelativeData(pinkNoiseRawData),
        R.identity,
      )(rawDataPoints);
    }, plotFiles),
  );

  const jsonData = R.flatten(data);
  await writeFile("data-akima.json", folderPath, jsonData);
}

run();

export {};
