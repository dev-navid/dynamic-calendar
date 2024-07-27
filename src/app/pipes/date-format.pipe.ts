import {Pipe, PipeTransform} from '@angular/core';
import * as jalaali from 'jalaali-js';
import {CalendarType} from "../types/calendar.type";

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  private readonly gregorianMonthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  private readonly jalaaliMonthNames = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد',
    'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];

  transform(date: Date, calendarType: CalendarType): string {
    if (calendarType === CalendarType.Jalaali) {
      const jalaaliDate = jalaali.toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
      return `${jalaaliDate.jy} ${this.jalaaliMonthNames[jalaaliDate.jm - 1]}`;
    } else {
      // no need to -1, because getMonth() started from 0.
      return `${date.getFullYear()} ${this.gregorianMonthNames[date.getMonth()]}`;
    }
  }
}
