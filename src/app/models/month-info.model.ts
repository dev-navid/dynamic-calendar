export interface MonthInfo {
  startDay: number;
  daysLength: number;
  today: number | null;
  weeks: (number | null)[][];
}
