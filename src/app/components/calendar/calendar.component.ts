import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {CalendarService} from "../../services/calendar.service";
import {CalendarType} from "../../types/calendar.type";
import {DateFormatPipe} from "../../pipes/date-format.pipe";
import {WeekNameListPipe} from "../../pipes/week-name-list.pipe";
import {MonthInfo} from "../../models/month-info.model";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    DateFormatPipe,
    WeekNameListPipe
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  // Exposing CalendarType to the template
  protected readonly CalendarType = CalendarType;

  // Default calendar type
  protected selectedCalendarType = CalendarType.Gregorian;

  // Current date being displayed
  protected currentDate: Date = new Date();

  // Information about the current month
  protected monthInfo: MonthInfo | undefined;

  constructor(protected calendarService: CalendarService) {
  }

  ngOnInit(): void {
    // Subscribe to the currentDate$ observable to update the currentDate
    this.calendarService.currentDate$.subscribe((currentDate) => {
      this.currentDate = currentDate;
    });

    // Subscribe to the monthInfo$ observable to update the monthInfo
    this.calendarService.monthInfo$.subscribe((monthInfo) => {
      this.monthInfo = monthInfo;
    });

    // Set the initial calendar type
    this.calendarService.setType(this.selectedCalendarType);
  }

  // Navigate to the previous month
  previousMonth() {
    this.calendarService.shiftMonth('PREVIOUS');
  }

  // Navigate to the next month
  nextMonth() {
    this.calendarService.shiftMonth('NEXT');
  }
}
