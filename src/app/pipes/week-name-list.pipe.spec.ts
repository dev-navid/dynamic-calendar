import {CalendarType} from '../types/calendar.type';
import {WeekNameListPipe} from "./week-name-list.pipe";

describe('WeekNameListPipe', () => {
  const pipe = new WeekNameListPipe();

  it('WeekNameListPipe should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return a Gregorian week name correctly', () => {
    const expected = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const result = pipe.transform(CalendarType.Gregorian);
    for (let i = 0; i < 7; i++) {
      expect(result[i]).toBe(expected[i]);
    }
  });

  it('should return a Jalaali week name correctly', () => {
    const expected = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
    const result = pipe.transform(CalendarType.Jalaali);
    for (let i = 0; i < 7; i++) {
      expect(result[i]).toBe(expected[i]);
    }
  });
});
