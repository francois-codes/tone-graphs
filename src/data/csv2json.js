module.exports = function csv2json(csv) {
  const lines = csv.toString().split("\n");

  return lines.reduce((file, line) => {
    const [frequency, db, name, gain, tone] = line.split(",");
    if (!Number.isNaN(Number(frequency))) {
      file.push({ frequency: Number(frequency), db: Number(db), tone, name, gain });
    }

    return file;
  }, []);
};
