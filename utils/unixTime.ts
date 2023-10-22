const MS = 1000;

export const toUnixTime = (date: Date) => {
  if (!date) return 0;
  date = new Date(date);
  return Math.floor(date.valueOf() / MS);
};

export const unixNow = () => toUnixTime(new Date());

export const elapsedTime = (timestamp: number): string => {
  const now = unixNow();
  const secondsPassed = now - timestamp;
  if (secondsPassed > 60) {
    const minutesPassed = Math.floor(secondsPassed / 60);
    return `${minutesPassed} min ago`;
  }
  return `${secondsPassed} secs ago`;
};
