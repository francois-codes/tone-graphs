/* eslint-disable @typescript-eslint/no-var-requires */

const Akima = require("akima-interpolator").default;
const { reducePoints } = require("../utils");

module.exports = function interpolate(points) {
  const [xval, yval] = reducePoints(points);
  console.log({ points });

  const res = new Akima().createInterpolator(xval, yval);

  return points.map(([x], index) => [x, res(index)]);
};
