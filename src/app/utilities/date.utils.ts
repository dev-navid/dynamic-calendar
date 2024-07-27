import {CalendarType} from "../types/calendar.type";
import * as jalaali from "jalaali-js";
import {MonthInfo} from "../models/month-info.model";

/**
 * Get the starting day and the length of the month for Gregorian calendar
 * @param date - The input date
 * @returns {monthStartDay: number, monthDaysLength: number}
 */
export function getGregorianMonthInfo(date: Date): { monthStartDay: number, monthDaysLength: number } {
  const gregorianDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const monthStartDay = gregorianDate.getDay();
  const monthDaysLength = new Date(gregorianDate.getFullYear(), gregorianDate.getMonth() + 1, 0).getDate();
  return {monthStartDay, monthDaysLength};
}

/**
 * Get the starting day and the length of the month for Jalaali calendar
 * @param date - The input date
 * @returns {monthStartDay: number, monthDaysLength: number}
 */
export function getJalaaliMonthInfo(date: Date): { monthStartDay: number, monthDaysLength: number } {
  const jalaaliDate = jalaali.toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const gregorianDate = jalaali.toGregorian(jalaaliDate.jy, jalaaliDate.jm, 1);
  let monthStartDay = new Date(gregorianDate.gy, gregorianDate.gm - 1, gregorianDate.gd).getDay() + 1;
  if (monthStartDay === 7)
    monthStartDay = 0; // That means we need to display month's weeks from start of the calendar
  const monthDaysLength = jalaali.jalaaliMonthLength(jalaaliDate.jy, jalaaliDate.jm);
  return {monthStartDay, monthDaysLength};
}

/**
 * Get the day of the month for today, if it is within the same month as the input date
 * @param date - The input date
 * @param calendarType - The type of calendar (Gregorian or Jalaali)
 * @returns {number} - The day of the month for today, or -1 if not applicable
 */
export function getToday(date: Date, calendarType: CalendarType): number {
  const todayDate = new Date();
  if (todayDate.getFullYear() === date.getFullYear() && todayDate.getMonth() === date.getMonth()) {
    if (calendarType === CalendarType.Gregorian) {
      return todayDate.getDate();
    } else {
      const jalaaliTodayDate = jalaali.toJalaali(todayDate.getFullYear(), todayDate.getMonth() + 1, todayDate.getDate());
      return jalaaliTodayDate.jd;
    }
  }
  return -1;
}

/**
 * Generate the weeks array for the month
 * @param monthStartDay - The starting day of the month
 * @param monthDaysLength - The length of the month
 * @returns {(number | null)[][]} - The weeks array
 */
export function generateWeeks(monthStartDay: number, monthDaysLength: number): (number | null)[][] {
  let weeks = [];
  let week: (number | null)[] = new Array(monthStartDay).fill(null);
  for (let day = 1; day <= monthDaysLength; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    weeks.push(week);
  }
  return weeks;
}

/**
 * Get month information based on the calendar type
 * @param date - The input date
 * @param calendarType - The type of calendar (Gregorian or Jalaali)
 * @returns {MonthInfo} - The month information
 */
export function getMonthInfo(date: Date, calendarType: CalendarType): MonthInfo {
  const {monthStartDay, monthDaysLength} = calendarType === CalendarType.Gregorian
    ? getGregorianMonthInfo(date)
    : getJalaaliMonthInfo(date);

  const today = getToday(date, calendarType);
  const weeks = generateWeeks(monthStartDay, monthDaysLength);

  return {startDay: monthStartDay, daysLength: monthDaysLength, today, weeks} as MonthInfo;
}
