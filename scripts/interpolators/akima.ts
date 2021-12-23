/* eslint-disable @typescript-eslint/no-var-requires */

import Akima from "akima-interpolator";

export default function interpolator() {
  return function interpolate([xval, yval]: XValsAndYVals): XValsAndYVals {
    const res = new Akima().createInterpolator(xval, yval);

    return xval.reduce(
      ([xvals, yvals], _, index) => {
        xvals.push(xval[index]);
        yvals.push(res(index));
        return [xvals, yvals];
      },
      [[], []],
    );
  };
}
