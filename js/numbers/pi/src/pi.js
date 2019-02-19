'use strict';

const Decimal = require('decimal.js');
const chalk = require('chalk');

/**
 * Export a function to calculate PI using the Chudnovsky algorithm.
 *
 * This is based on the Python implementation found here:
 *   https://en.wikipedia.org/wiki/Chudnovsky_algorithm
 */
module.exports = function({
  maxK = 70,
  display = 100,
  precision = 101,
  verbose = false
} = {}) {
  const Dec = Decimal.clone({ default: true, precision });

  let K = new Dec(6);
  let M = new Dec(1);
  let L = new Dec(13591409);
  let X = new Dec(1);
  let S = new Dec(13591409);

  for (let k = 1; k <= maxK; k++) {
    M = K.toPower(3)
      .minus(K.times(16))
      .times(M)
      .dividedBy(k ** 3)
      .floor();
    L = L.add(545140134);
    X = X.times('-262537412640768000');
    S = M.times(L)
      .dividedBy(X)
      .plus(S);
    K = K.plus(12);
  }

  let pi = Dec.sqrt(10005)
    .times(426880)
    .dividedBy(S);

  if (verbose) {
    console.log(chalk`
  {hex('#78FFB7') maxK      →} ${maxK.toLocaleString()} iterations
  {hex('#78FFB7') display   →} ${display.toLocaleString()} digits
  {hex('#78FFB7') precision →} ${precision.toLocaleString()} digits
  {bold.hex('#78FFB7') pi        →} {bold ${pi.toPrecision(display)}}
`);
  } else {
    console.log(`${pi.toPrecision(display)}`);
  }
  return pi;
};
