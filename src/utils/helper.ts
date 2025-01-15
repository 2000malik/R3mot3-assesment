export const unitAbbreviationForTemperature = (unit: string) => {
  if (unit === "imperial") {
    return "°F";
  }
  return "°C";
};
export const isObjEmpty = (obj: object) => {
  return Object.keys(obj).length === 0;
};
export const unitAbbreviationForSpeed = (unit: string) => {
  if (unit === "imperial") {
    return "mph";
  }
  return "m/s";
};
