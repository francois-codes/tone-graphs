function cardinalPointForIndex(c, index, xval, yval) {
  return new Array(index - 1).fill(0).reduce((acc, _, i) => {
    return acc + (1 - c) * ((yval[i + 1] - yval[i - 1]) / (xval[i + 1] - xval[i - 1]));
  }, 0);
}

export default function interpolator(c) {
  return function interpolate([xval, yval]: XValsAndYVals): XValsAndYVals {
    const res = yval.map((y, index) => {
      if (index === 0 || index === xval.length - 1) {
        return y;
      }

      return cardinalPointForIndex(c, index, xval, yval);
    });

    return [xval, res];
  };
}
