// //adapted from the LoessInterpolator in org.apache.commons.math
module.exports = function loess_pairs(datapoints, bandwidth = 0.1) {
  const { xval, yval } = datapoints.reduce(
    ({ xval, yval }, { db, frequency }) => {
      xval.push(frequency);
      yval.push(db);

      return { xval, yval };
    },
    { xval: [], yval: [] },
  );

  // console.log(xval);
  // console.log(yval);
  const res = loess(xval, yval, bandwidth);
  // console.log(res);

  return datapoints.map((datapoint, index) => {
    datapoint.loess = res[index];

    return datapoint;
  });
};

function tricube(x) {
  return (1 - x ** 3) ** 3;
}

function loess(xval, yval, bandwidth) {
  const res = [];

  let left = 0;
  let right = Math.floor(bandwidth * xval.length) - 1;

  for (let i in xval) {
    const x = xval[i];

    if (i > 0) {
      if (right < xval.length - 1 && xval[right + 1] - xval[i] < xval[i] - xval[left]) {
        left++;
        right++;
      }
    }

    // var edge;
    // if (xval[i] - xval[left] > xval[right] - xval[i]) edge = left;
    // else edge = right;

    const edge = xval[i] - xval[left] > xval[right] - xval[i] ? left : right;

    const denom = Math.abs(1.0 / (xval[edge] - x));

    let sumWeights = 0;
    let sumX = 0,
      sumXSquared = 0,
      sumY = 0,
      sumXY = 0;

    let k = left;
    while (k <= right) {
      const xk = xval[k];
      const yk = yval[k];
      // var dist;
      // if (k < i) {
      //   dist = x - xk;
      // } else {
      //   dist = xk - x;
      // }

      const dist = k < i ? x - xk : xk - x;

      const w = tricube(dist * denom);
      const xkw = xk * w;
      sumWeights += w;
      sumX += xkw;
      sumXSquared += xk * xkw;
      sumY += yk * w;
      sumXY += yk * xkw;
      k++;
    }

    const meanX = sumX / sumWeights;
    const meanY = sumY / sumWeights;
    const meanXY = sumXY / sumWeights;
    const meanXSquared = sumXSquared / sumWeights;

    // var beta;
    // if (meanXSquared == meanX * meanX) beta = 0;
    // else beta = (meanXY - meanX * meanY) / (meanXSquared - meanX * meanX);

    const beta = meanXSquared == meanX * meanX ? 0 : (meanXY - meanX * meanY) / (meanXSquared - meanX * meanX);

    const alpha = meanY - beta * meanX;

    res[i] = beta * x + alpha;
  }

  return res;
}
