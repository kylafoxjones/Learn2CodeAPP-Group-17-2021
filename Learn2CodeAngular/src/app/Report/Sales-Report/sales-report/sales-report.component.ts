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
import { NbLayoutComponent } from '@nebular/theme';
import { NbLayoutColumnComponent } from '@nebular/theme';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit {

  constructor(
    private router: Router,
   private ReportService : ReportingService
  ) { }


  ngOnInit(): void {
  }
  x(){
    Swal.fire(
      '',
      'Successfully downloaded report',
      'success'
    )
  }


  public RedirectReportHome(){
    this.router.navigateByUrl('/report-home');
  }
  
  public DownloadPDF():void {
    let data = document.getElementById('TutorsessionData');
      
    html2canvas(data).then(canvas => {
        
        let fileWidth = 300;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('l', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save('TutorSessionReport.pdf');
    });     
  }
}
