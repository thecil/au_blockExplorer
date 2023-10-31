const MS = 1000;

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// convert a date to timestamp (unix)
export const toUnixTime = (date: Date) => {
  if (!date) return 0;
  date = new Date(date);
  return Math.floor(date.valueOf() / MS);
};
// return timestamp of actual time
export const unixNow = () => toUnixTime(new Date());

// based on given timestamp, calculate how many secs/mins/hours has passed since actual time.
export const elapsedTime = (timestamp: number): string => {
  const now = unixNow();
  const secondsPassed = now - timestamp;
  if (secondsPassed > 60) {
    const minutesPassed = Math.floor(secondsPassed / 60);
    if (minutesPassed > 60) {
      const hoursPassed = Math.floor(minutesPassed / 60);
      const remainingMinutes = minutesPassed % 60;
      return `${hoursPassed} hrs ${remainingMinutes} mins ago`;
    }
    return `${minutesPassed} min ago`;
  }
  return `${secondsPassed} secs ago`;
};
// return date in local string of given timestamp
export const unixToDate = (timestamp: number): string =>
  new Date(timestamp * MS).toLocaleString();
