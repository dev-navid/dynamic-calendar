import * as jalaali from "jalaali-js";
import {MonthInfo} from "../models/month-info.model";
import {CalendarType} from "../types/calendar.type";
import {generateWeeks, getGregorianMonthInfo, getJalaaliMonthInfo, getMonthInfo, getToday} from "./date.utils";

describe('getMonthInfo functions', () => {
  it('should return correct Gregorian month info', () => {
    const date = new Date(2024, 6, 1); // July 2024, Monday

    const {monthStartDay, monthDaysLength} = getGregorianMonthInfo(date);

    expect(monthStartDay).toBe(1); // July 1, 2024, is Monday
    expect(monthDaysLength).toBe(31);
  });

  it('should return correct Jalaali month info', () => {
    const date = new Date(2024, 6, 1); // July 2024

    const {monthStartDay, monthDaysLength} = getJalaaliMonthInfo(date);

    expect(monthStartDay).toBe(6); // Tir 1, 1403, is Friday
    expect(monthDaysLength).toBe(31);
  });

  it('should return correct today date for Gregorian calendar', () => {
    const date = new Date();

    const today = getToday(date, CalendarType.Gregorian);

    expect(today).toBe(date.getDate());
  });

  it('should return correct today date for Jalaali calendar', () => {
    const date = new Date();

    const today = getToday(date, CalendarType.Jalaali);
    const jalaaliToday = jalaali.toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());

    expect(today).toBe(jalaaliToday.jd);
  });

  it('should generate correct weeks array', () => {
    const monthStartDay = 1; // Monday
    const monthDaysLength = 31;

    const weeks = generateWeeks(monthStartDay, monthDaysLength);

    expect(weeks.length).toBe(5); // July 2024 has 5 weeks
    expect(weeks[0]).toEqual([null, 1, 2, 3, 4, 5, 6]);
    expect(weeks[4]).toEqual([28, 29, 30, 31, null, null, null]);
  });

  it('should return correct month info for Gregorian calendar', () => {
    const date = new Date(2024, 6, 1); // July 2024

    const monthInfo: MonthInfo = getMonthInfo(date, CalendarType.Gregorian);

    expect(monthInfo.startDay).toBe(1); // July 1, 2024, is Monday
    expect(monthInfo.daysLength).toBe(31);
    expect(monthInfo.weeks.length).toBe(5);
  });

  it('should return correct month info for Jalaali calendar', () => {
    const date = new Date(2024, 6, 1); // June 2024

    const monthInfo: MonthInfo = getMonthInfo(date, CalendarType.Jalaali);

    expect(monthInfo.startDay).toBe(6); // Tir 1, 1403, is Friday
    expect(monthInfo.daysLength).toBe(31);
    expect(monthInfo.weeks.length).toBe(6);
  });
});
