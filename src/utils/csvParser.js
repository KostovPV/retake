export const parseCSV = (csvText) => {
  const lines = csvText.trim().split("\n");
  const headers = lines[0].split("\t").map(h => h.trim());

  return lines.slice(1).map(line => {
    const values = line.split("\t").map(v => v.trim());
    const dataObject = {};
    headers.forEach((header, i) => {
      const value = values[i];
      dataObject[header] = value === "NULL" || value === "null" ? null : value;
    });
    return dataObject;
  });
};

