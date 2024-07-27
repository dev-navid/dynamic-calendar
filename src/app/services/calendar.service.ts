import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
import {CalendarType} from "../types/calendar.type";
import {getMonthInfo} from "../utilities/date.utils";
import {MonthInfo} from "../models/month-info.model";

@Injectable({providedIn: 'root'})
export class CalendarService {

  private monthInfo: Subject<MonthInfo> = new Subject<MonthInfo>();
  public readonly monthInfo$ = this.monthInfo.asObservable();
  private currentDate: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
  public currentDate$ = this.currentDate.asObservable();
  private currentCalendarType: CalendarType = CalendarType.Gregorian;

  public setType(type: CalendarType) {
    this.currentCalendarType = type;
    this.setCurrentDate(new Date())
  }

  public shiftMonth(direction: 'PREVIOUS' | 'NEXT') {
    let date = this.currentDate.value;
    let updatedMonth = direction === 'NEXT' ? date.getMonth() + 1 : date.getMonth() - 1;
    date.setMonth(updatedMonth);
    this.setCurrentDate(new Date(date))
  }

  private setCurrentDate(date: Date) {
    this.currentDate.next(date);
    const month = getMonthInfo(date, this.currentCalendarType);
    this.monthInfo.next(month);
  }
}
