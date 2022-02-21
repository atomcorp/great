import {localStorageKeys} from '../consts';

export const getEntryFromDate = (date: string): string => {
  if (date) {
    const localStorageData = localStorage.getItem(localStorageKeys.data);
    if (localStorageData) {
      const jsData = JSON.parse(localStorageData);
      const entryData = jsData.find((entry: string[]) => entry[0] === date);
      if (Array.isArray(entryData)) {
        return entryData[1];
      }
    }
  }
  return '';
};

export const getData = (): string => {
  const data = localStorage.getItem(localStorageKeys.data);
  if (data) {
    return data;
  }
  return '';
};

export const setData = (data: string[][]) => {
  localStorage.setItem(localStorageKeys.data, JSON.stringify(data));
};
