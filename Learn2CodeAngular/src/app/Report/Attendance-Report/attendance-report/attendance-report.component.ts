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
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss']
})
export class AttendanceReportComponent implements OnInit {

  sessionsentantce:string ="";
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
  date:any;
  sentance:string="";
reg:any;
missed:any=[];
attended:any=[];
regmissed:any;
attendreg:any;
fx:any;
fxx:any;
fxxx:any;
module:any ={};
bookingname:string="";

  constructor(
    private reportService: ReportingService,
    private router: Router,private datePipe: DatePipe
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
console.log(value);
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
    console.log(result);
    this.AttendedList = result;
    this.totalLength1 = this.AttendedList.length;
this.reg = this.AttendedList.length;
this.AttendanceListattended();
this.AttendanceLmissed();
this.Attendancename();
this.module = result[0];



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

// public DownloadPDF():void {
//   let data = document.getElementById('AttendanceData');

//   html2canvas(data).then(canvas => {

//       let fileWidth = 300;
//       let fileHeight = canvas.height * fileWidth / canvas.width;

//       const FILEURI = canvas.toDataURL('image/png')
//       let PDF = new jsPDF('l', 'mm', 'a4');
//       let position = 0;
//       PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

//       PDF.save('AttendanceReport.pdf');
//   });
// }



AttendanceListattended(){
  this.ID = this.BookingInstanceID[0];

  this.reportService.getAttendedListattended(this.ID).subscribe((result) =>{
    this.attended = result;
    this.attendreg = this.attended.length;
  })

  

 }

 Attendancename(){
  this.ID = this.BookingInstanceID[0];

  this.reportService.attendmodule(this.ID).subscribe((result) =>{
   
  
  
  var name = "title";
console.log(result[name]);
  this.module = result[name];
  console.log(this.module);
  })

  

 }

 AttendanceLmissed(){
  this.ID = this.BookingInstanceID[0];

  this.reportService.getAttendedListmissed(this.ID).subscribe((result) =>{
    this.missed = result;
    this.regmissed = this.missed.length;
   
  })

  

 }



 public DownloadPDF():void {
  

  var imgs = new Image();
var src = "../.././assets/pics/HD logo.png";
imgs.src = src;
  let data = document.getElementById('AttendanceData');
  let datas = document.getElementById('totalattend');
  let datass = document.getElementById('missedtable');
  let datasss = document.getElementById('charts');
  this.date=new Date();
  let latest_date =this.datePipe.transform(this.date, 'dd-MM-yyyy');
 this.sentance = "Date generated:"+latest_date;
 html2canvas(datas).then(canvass => {this.fx = canvass.toDataURL('image/png')})
 html2canvas(datass).then(canvasss => {this.fxx = canvasss.toDataURL('image/png')})
 html2canvas(datasss).then(canvassss => {this.fxxx = canvassss.toDataURL('image/png')})
  html2canvas(data).then(canvas => {
    
      
      let fileWidth = 170;
      let fileHeight = canvas.height * fileWidth / canvas.width;
      
     
      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      PDF.addImage(imgs, 'PNG', 10, 5, 25, 25)
      let position = 0;
      PDF.setFontSize(10);
      PDF.setFont(undefined, 'bold')
      PDF.text("Registered students table",86,78);
      PDF.addImage(FILEURI, 'PNG', 20, 80, fileWidth, fileHeight)
      PDF.setFont(undefined, 'bold')
      PDF.text("Attended students table",86,158);
      PDF.addImage(this.fx, 'PNG', 20, 160, fileWidth, 25)
      PDF.text("Absent students table",86,205);
      PDF.addImage(this.fxx, 'PNG', 20, 210, fileWidth, 25)
      PDF.setFontSize(22);
      PDF.setFont(undefined, 'bold')
      PDF.text("Attendance report",72,20);
      PDF.setFontSize(9);
      PDF.setFont(undefined, 'normal')
      PDF.text("Description: Report displays the attendance for a specific session ",15,40);
      PDF.text("Generated by: Admin.",15,45);
      PDF.text(this.sentance,15,50);
      let cc = "Session title: "+ this.module
      PDF.text(cc,15,55);
      PDF.addPage();
      PDF.setFontSize(10);
      PDF.setFont(undefined, 'bold')
      PDF.text("Attendance graph",90,10);
      PDF.addImage(this.fxxx, 'PNG', -32, 30, 280, 80)
     
// PAGE NUMBERING
// Add Page number at bottom-right
// Get the number of pages
var pageCount = PDF.getNumberOfPages();

// For each page, print the page number and the total pages
for(var i = 1; i <= pageCount; i++) {
  // Go to page i
 PDF.setPage(i);
  //Print Page 1 of 4 for example
 PDF.text('Page ' + String(i) + ' of ' + String(pageCount),180,289,null,null);
}



      PDF.save('Attendance.pdf');
  });     
}



}


