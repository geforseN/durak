export function calculateWinRatePercent({
  winsCount,
  losesCount,
}: {
  winsCount: number;
  losesCount: number;
}) {
  if (winsCount + losesCount === 0) {
    return "0";
  }
  const winRate = (winsCount / (winsCount + losesCount)) * 100;
  const fractionDigits = winRate % 1 === 0 ? 0 : 2;
  return winRate.toFixed(fractionDigits) + "%";
}
