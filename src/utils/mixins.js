export const logingFromInputNumber = (number) => {
  let baseLog = `Created parking lot with ${number} slots\n`;
  for (let i = 0; i < number; i++) {
    baseLog += `Allocated slot number: ${i + 1}\n`;
  }
  return baseLog;
};

export const handleCalculateParkingFee = (entryTime) => {
  const entryTimeDate = new Date(entryTime);
  const currentDate = new Date();
  const differenceInMillis = currentDate - entryTimeDate;

  const freeThreshold = 10;
  const totalHour = Math.floor(differenceInMillis / (1000 * 60 * 60));
  const totalFree = (totalHour % 2) * freeThreshold + freeThreshold;
  return totalFree;
};
