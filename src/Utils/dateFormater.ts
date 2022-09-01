export const formatDate = (date: string) => {
  console.log("DATE:", date);
  if (!date) return "";
  const [year, month, day] = date.split("-");
  const result = [month, day, year].join("-");
  return result;
};
