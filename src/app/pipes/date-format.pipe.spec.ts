import {DateFormatPipe} from './date-format.pipe';
import {CalendarType} from '../types/calendar.type';

describe('DateFormatPipe', () => {
  const pipe = new DateFormatPipe();

  it('DateFormatPipe should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format a Gregorian date correctly', () => {
    const date = new Date(2022, 5, 30); // June 2022
    const result = pipe.transform(date, CalendarType.Gregorian);
    expect(result).toBe('2022 June');
  });

  it('should format a Jalaali date correctly', () => {
    const date = new Date(1996, 6, 20); // July, 20 1996
    const result = pipe.transform(date, CalendarType.Jalaali);
    expect(result).toBe('1375 تیر');
  });

  it('should format a Jalaali date correctly', () => {
    const date = new Date(2024, 6, 27); // July, 27 2024
    const result = pipe.transform(date, CalendarType.Jalaali);
    expect(result).toBe('1403 مرداد');
  });

  it('should format a Jalaali date correctly', () => {
    const date = new Date(); // July, 27 2024
    const result = pipe.transform(date, CalendarType.Jalaali);
    expect(result).toBe('1403 مرداد');
  });
});
