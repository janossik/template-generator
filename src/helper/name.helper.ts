export function replaceDividerWithCamelCase(value: string, sing = "/") {
  return value
    .split(sing)
    .map((value, index) => {
      if (index === 0) return value;
      return value[0].toUpperCase() + value.slice(1);
    })
    .join("");
}

export function generateCamelCaseName(name: string, prefix: string, suffix: string) {
  return `${prefix}${replaceDividerWithCamelCase(replaceDividerWithCamelCase(name, "/"), "-")}${suffix[0].toUpperCase() + suffix.slice(1)}`;
}
