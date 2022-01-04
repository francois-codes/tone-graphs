export default function interpolator(iterations, frequencyThreshold) {
  let step = 0;

  return function averagePoints([xval, yval]: XValsAndYVals): XValsAndYVals {
    const res = yval.map((y, index) => {
      if (xval[index] <= frequencyThreshold) return y;

      if (index < 4 || index > yval.length - 3) return y;
      return (yval[index - 2] + yval[index - 1] + yval[index + 1] + yval[index + 2]) / 4;
    });

    if (step < iterations) {
      step++;
      return averagePoints([xval, res]);
    }

    return [xval, res];
  };
}
