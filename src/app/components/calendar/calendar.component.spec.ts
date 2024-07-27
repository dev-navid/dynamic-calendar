import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CalendarComponent} from './calendar.component';
import {By} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarComponent, BrowserAnimationsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a calendar type dropdown', () => {
    const calendarTypeElement = fixture.debugElement.query(By.css('.calendar-type mat-form-field'));

    expect(calendarTypeElement).toBeTruthy();
  });

  it('should have a calendar header', () => {
    const calendarHeaderElement = fixture.debugElement.query(By.css('.calendar-header'));

    expect(calendarHeaderElement).toBeTruthy();
  });

  it('should have previous and next buttons in the header', () => {
    const previousButton = fixture.debugElement.query(By.css('button[data-cy="calendar-previous"]'));
    const nextButton = fixture.debugElement.query(By.css('button[data-cy="calendar-next"]'));

    expect(previousButton).toBeTruthy();
    expect(nextButton).toBeTruthy();
  });

  it('should have a calendar label in the header', () => {
    const calendarLabel = fixture.debugElement.query(By.css('span[data-cy="calendar-label"]'));

    expect(calendarLabel).toBeTruthy();
  });

  it('should have week names', () => {
    const weekNames = fixture.debugElement.queryAll(By.css('.calendar-week-name'));

    expect(weekNames.length).toBe(7); // Assuming there are always 7 week names
  });

  it('should have calendar days', () => {
    const calendarDays = fixture.debugElement.queryAll(By.css('.calendar-day-container'));

    expect(calendarDays.length).toBeGreaterThan(0); // There should be some days rendered
  });
});
