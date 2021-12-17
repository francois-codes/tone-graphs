#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require("fs");
const { resolve } = require("path");
const csv2json = require("../src/data/csv2json");

const resolvePath = (path) => resolve(process.cwd(), path);

async function run() {
  const csvFile = resolvePath(process.argv[2]);

  const csv = await fs.promises.readFile(csvFile, "utf8");
  const data = csv2json(csv);
  console.log(JSON.stringify(data));
}

run();
