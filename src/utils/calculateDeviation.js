const calculateStandardDeviation = (arr) => {
  const n = arr.length;
  if (n === 0) return 0;

  const mean = arr.reduce((a, b) => a + b, 0) / n;
  const variance = arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
  const stdDev = Math.sqrt(variance);

  return parseFloat(stdDev.toFixed(2));
};

module.exports = calculateStandardDeviation;
