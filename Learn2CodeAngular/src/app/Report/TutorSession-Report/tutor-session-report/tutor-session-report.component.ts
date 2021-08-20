import { Component, OnInit } from '@angular/core';
import { ReportingService } from '../../Report resources/reporting.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { ChartsModule, Color, Label } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {MatDatepickerModule} from '@angular/material/datepicker';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tutor-session-report',
  templateUrl: './tutor-session-report.component.html',
  styleUrls: ['./tutor-session-report.component.scss']
})
export class TutorSessionReportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  x(){
    Swal.fire(
      '',
      'Successfully downloaded report',
      'success'
    )
  }


}
