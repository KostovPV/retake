// Convert DD.MM.YYYY -> MM/DD/YYYY for storage (US format)
export const convertToStorageDate = (europeanDate) => {
  if (!europeanDate || !europeanDate.includes(".")) return europeanDate;
  const [day, month, year] = europeanDate.split(".");
  return `${month}/${day}/${year}`;
};

// Convert MM/DD/YYYY -> DD.MM.YYYY for display/editing (European format)
export const convertToEuropeanDate = (usDate) => {
  if (!usDate || !usDate.includes("/")) return usDate;
  const [month, day, year] = usDate.split("/");
  return `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year}`;
};
