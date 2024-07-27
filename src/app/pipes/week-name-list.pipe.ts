import {Pipe, PipeTransform} from '@angular/core';
import {CalendarType} from "../types/calendar.type";

@Pipe({
  name: 'weekNameList',
  standalone: true
})
export class WeekNameListPipe implements PipeTransform {

  private readonly gregorianWeekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  private readonly jalaaliWeekNames = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];

  transform(calendarType: CalendarType): string[] {
    return calendarType === CalendarType.Gregorian ? this.gregorianWeekNames : this.jalaaliWeekNames;
  }
}
