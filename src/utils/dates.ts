export const todaysDate = () => new Date().toISOString().substring(0, 10);

export const getDisplayDate = (
  date: string,
  options?: Intl.DateTimeFormatOptions
) => {
  const dateObject = new Date(date);
  const formattedDate = new Intl.DateTimeFormat(
    navigator.language,
    options
  ).format(dateObject);
  return formattedDate;
};
