import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NbThemeModule, NbLayoutModule, NbSidebarComponent } from '@nebular/theme';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ReportingService } from '../../Report resources/reporting.service';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';



@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss']
})
export class AttendanceReportComponent implements OnInit {


  //pagination
  page1:number = 1;
  totalLength1:any;
  //Lists
  SessionList:any = [];
  AttendedList:any = [];
  BookingInstanceID:any[] = [];
  ID:number = 0;
  chartScoreList:any = [];
  Attended: number = 0;
  Missed: number = 0;
  sessionxv: any;



  constructor(
    private reportService: ReportingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.SessionDropdown(),
    this.AttendanceList(),
    this.pieChartData = [0,0];

  }
  x(){
    Swal.fire(
      '',
      'Successfully downloaded report',
      'success'
    )
  }
  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };
  


  changeSession(value) {

    this.BookingInstanceID = value;
    console.log(this.BookingInstanceID);

    }

 SessionDropdown(){
  this.reportService.getSessionDropdown().subscribe((result) => {
    this.SessionList = result;
    console.log(this.SessionList);
  });
 }

 AttendanceList(){
  this.ID = this.BookingInstanceID[0];

  this.reportService.getAttendedList(this.ID).subscribe((result) =>{
    this.AttendedList = result;
    this.totalLength1 = this.AttendedList.length;

  })

  //Attendance Chart
  this.reportService.getAttendedGraphInfo(this.ID).subscribe((result) =>{
    this.chartScoreList = result;
    console.log(this.chartScoreList);
    this.Attended = this.chartScoreList.attended;
    this.Missed = this.chartScoreList.missed;

    this.pieChartData = [this.Attended,this.Missed];

  })

 }






 public pieChartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    position: 'top',
  },
  plugins: {
    datalabels: {
      formatter: (value, ctx) => {
        const label = ctx.chart.data.labels[ctx.dataIndex];
        return label;
      },
    },
  }
};
public pieChartLabels: Label[] =['Attended', 'Missed'];
public pieChartData: number[] = [3, 1];
public pieChartType: ChartType = 'pie';
public pieChartLegend = true;

public pieChartColors = [
  {
    backgroundColor: ['rgb(0, 204, 204)','#009c9e'],
  },
];




 public RedirectReportHome(){
  this.router.navigateByUrl('/report-home');
}

public DownloadPDF():void {
  let data = document.getElementById('AttendanceData');

  html2canvas(data).then(canvas => {

      let fileWidth = 300;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('l', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save('AttendanceReport.pdf');
  });
}

}
