import { Routes } from '@angular/router';
import {CalendarComponent} from "./components/calendar/calendar.component";

export const routes: Routes = [
  { path: 'calendar', component: CalendarComponent },
  { path: '',   redirectTo: '/calendar', pathMatch: 'full' }, // redirect to `calendar`
];
