import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import Swal from 'sweetalert2';
import {MatDialog} from '@angular/material/dialog';


import {
  endOfDay,
  addMonths
} from 'date-fns';

import {
  DAYS_IN_WEEK,
  SchedulerViewDay,
  SchedulerViewHour,
  SchedulerViewHourSegment,
  CalendarSchedulerEvent,
  CalendarSchedulerEventAction,
  startOfPeriod,
  endOfPeriod,
  addPeriod,
  subPeriod,
  SchedulerDateFormatter,
  SchedulerEventTimesChangedEvent,
  CalendarSchedulerViewComponent
} from 'angular-calendar-scheduler';

// import {
//   CalendarView,
//   CalendarDateFormatter,
//   DateAdapter
// } from 'angular-calendar';

import { Subject } from 'rxjs';
//import { AppServiceService } from './app-service.service';


@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss'],
//   providers: [{
//    provide: CalendarDateFormatter,
//    useClass: SchedulerDateFormatter
// }]
})

export class SessionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
