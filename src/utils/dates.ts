export const todaysDate = () => new Date().toISOString().substring(0, 10);

export const getTodaysEntry = (
  entries: string[][]
): string[] | undefined | void => {
  if (entries) {
    const entryForDate = entries.find(([date]) => date === todaysDate());
    return entryForDate;
  }
};
