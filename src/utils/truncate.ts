export const truncate = (value: string, maxLength: number) => {
  return value && value.length > maxLength
    ? value.slice(0, maxLength) + "..."
    : value;
};
