import science from "science";

export default function interpolator(bandwidth) {
  return function interpolate([xval, yval]) {
    const loessGenerator = science.stats.loess();
    loessGenerator.bandwidth(bandwidth);
    const loessValues = loessGenerator(xval, yval);

    return xval.map((x, i) => [x, loessValues[i]]);
  };
}
