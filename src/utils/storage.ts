import {localStorageKeys} from '../consts';
import {todaysDate} from './dates';

export const getEntryFromDate = (date: string): string => {
  if (date) {
    const entries = getEntries();
    if (entries) {
      const entryData = entries.find((entry: string[]) => entry[0] === date);
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

export const getEntries = () => {
  const dataFromStorage = getData();
  if (dataFromStorage) {
    const entries = JSON.parse(dataFromStorage) as string[][];
    return entries.sort((a, b) => (a[0] < b[0] ? 1 : -1));
  }
  return [];
};

export const getTodaysEntry = () => {
  const entries = getEntries();
  if (entries) {
    const todaysEntry = entries.find(([date]) => date === todaysDate());
    if (Array.isArray(todaysEntry)) {
      return todaysEntry[1];
    }
  }
  return '';
};
