export function formattedDate(date: Date) : string {
  return date.toLocaleDateString("en-US").split(",")[0];
 }