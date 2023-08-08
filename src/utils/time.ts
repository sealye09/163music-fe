type TFormatter = "mm:ss" | "hh:mm" | "mm:ss:ms" | "hh:mm:ss:ms";

const toMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = Math.floor(seconds % 60);
  return `${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
};

const toHours = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLeft = Math.floor(seconds % 60);
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
    secondsLeft < 10 ? "0" : ""
  }${secondsLeft}`;
};

const toMinutesWithMs = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = Math.floor(seconds % 60);
  const ms = Math.floor((seconds - Math.floor(seconds)) * 1000);
  return `${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}:${ms}`;
};

const toHoursWithMs = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLeft = Math.floor(seconds % 60);
  const ms = Math.floor((seconds - Math.floor(seconds)) * 1000);
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
    secondsLeft < 10 ? "0" : ""
  }${secondsLeft}:${ms}`;
};

/**
 * 格式化时间
 * @param {number} time 秒
 * @param {TFormatter} formatter 格式
 * @returns
 */
export const formatTime = (time: number, formatter: TFormatter) => {
  const seconds = time;
  switch (formatter) {
    case "mm:ss":
      return toMinutes(seconds);
    case "hh:mm":
      return toHours(seconds);
    case "mm:ss:ms":
      return toMinutesWithMs(seconds);
    case "hh:mm:ss:ms":
      return toHoursWithMs(seconds);
    default:
      return toMinutes(seconds);
  }
};
