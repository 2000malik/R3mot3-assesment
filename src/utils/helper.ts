export const unitAbbreviationForTemperature = (unit: string) => {
  if (unit === "imperial") {
    return "°F";
  }
  return "°C";
};

export const unitAbbreviationForSpeed = (unit: string) => {
  if (unit === "imperial") {
    return "mph";
  }
  return "m/s";
};
export const isObjEmpty = (obj: object | null | undefined): boolean => {
  if (obj === null) return true;

  // If it's an array, check if it's empty
  if (Array.isArray(obj)) {
    return obj.length === 0;
  }

  // If it's an object, check if it has any own properties
  if (typeof obj === "object") {
    return Object.keys(obj).length === 0;
  }

  // If it's a primitive type (string, number, etc.), return false since it's not empty
  return false;
};
