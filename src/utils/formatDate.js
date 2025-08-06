export const formatDate = (dateString) => {
  if (!dateString) return "";

  const parts = dateString.split("/");
  if (parts.length !== 3) return dateString;

  const [month, day, year] = parts;
  return `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year}`;
};
