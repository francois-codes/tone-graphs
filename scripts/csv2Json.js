#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require("fs");
const { resolve } = require("path");

const resolvePath = (path) => resolve(process.cwd(), path);

async function run() {
  const csvFile = resolvePath(process.argv[2]);

  const csv = await fs.promises.readFile(csvFile, "utf8");

  const lines = csv.toString().split("\n");

  const data = lines.reduce((file, line) => {
    const [frequency, db, name, gain, tone] = line.split(",");
    if (!Number.isNaN(Number(frequency))) {
      file.push({ frequency: Number(frequency), db: Number(db), tone, name, gain });
    }

    return file;
  }, []);

  console.log(JSON.stringify(data));
}

run();
