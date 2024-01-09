export function mixedBigIntToString(value: string | number | bigint) {
  if (typeof value === "string") {
    return value;
  }

  return value.toString();
}

export function mixedBigIntToNumber(value: string | number | bigint) {
  if (typeof value === "number") {
    return value;
  }

  return Number(value);
}
