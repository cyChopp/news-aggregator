import { TFilter } from "./TShared";

export const loadKey = (key: string, defaultValue?: TFilter) => {
  let item = sessionStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
};
