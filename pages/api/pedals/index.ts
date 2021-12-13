import fs from "fs";
import * as R from "ramda";

const ts808File = fs.readFileSync("./src/data/TS808.csv", "utf8").toString();

function parseCSV(csv: string): ToneGraph {
  const lines = csv.split("\n");

  return R.compose(
    R.reduce((result, line) => {
      const [frequency, db, _, __, tone] = line.split(",");
      if (!Number.isNaN(Number(frequency))) {
        result.push({ frequency: Number(frequency), db: Number(db), tone });
      }

      return result;
    }, []),
  )(lines);
}

const ts808 = {
  name: "TS808",
  data: parseCSV(ts808File),
};

export default function handler(_, res) {
  const pedals = { ts808 };

  res.status(200).json(pedals);
}
