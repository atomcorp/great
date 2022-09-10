/**
 *
 * @param date eg 2022-12-30
 */
export const parseDate = (date: string) => {
  const dateArray = date.split('-').map((str) => parseInt(str, 10));
  return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
};

export const todaysDate = () => new Date().toISOString().substring(0, 10);

export const previousDaysDate = (date: string): string => {
  const dateObj = parseDate(date);
  dateObj.setUTCDate(dateObj.getDate() - 1);
  return dateObj.toISOString().substring(0, 10);
};

export const yesterdaysDate = () => previousDaysDate(todaysDate());

export const getDisplayDate = (
  date: string,
  options?: Intl.DateTimeFormatOptions
) => {
  const dateObject = parseDate(date);
  const formattedDate = new Intl.DateTimeFormat(
    navigator.language,
    options
  ).format(dateObject);
  return formattedDate;
};
