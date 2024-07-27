import {TestBed} from '@angular/core/testing';
import {CalendarService} from './calendar.service';
import {CalendarType} from '../types/calendar.type';
import {take} from 'rxjs/operators';

describe('CalendarService', () => {
  let service: CalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the calendar type and update the current date', () => {
    spyOn(service as any, 'setCurrentDate').and.callThrough();
    service.setType(CalendarType.Jalaali);
    expect(service['currentCalendarType']).toBe(CalendarType.Jalaali);
    expect((service as any).setCurrentDate).toHaveBeenCalledWith(jasmine.any(Date));
  });

  it('should shift the month correctly when direction is NEXT', () => {
    const initialDate = new Date(2021, 5, 15); // June 15, 2021
    service['currentDate'].next(initialDate);

    service.shiftMonth('NEXT');

    service.currentDate$.pipe(take(1)).subscribe(date => {
      expect(date.getMonth()).toBe(6); // July
    });
  });

  it('should shift the month correctly when direction is PREVIOUS', () => {
    const initialDate = new Date(2021, 5, 15); // June 15, 2021
    service['currentDate'].next(initialDate);

    service.shiftMonth('PREVIOUS');

    service.currentDate$.pipe(take(1)).subscribe(date => {
      expect(date.getMonth()).toBe(4); // May
    });
  });
});
