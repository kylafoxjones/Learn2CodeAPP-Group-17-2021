import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ReportingService } from '../../Report resources/reporting.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { ChartsModule, Color, Label } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-feedback-report',
  templateUrl: './feedback-report.component.html',
  styleUrls: ['./feedback-report.component.scss']
})
export class FeedbackReportComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  private updateChart(){
    this.chart.chart.update;
    this.chart.ngOnChanges({});
   }

fx:any;
   //pagination
   page1:number = 1;
   totalLength1:any;
   //list
  SessionList:any=[];
  FeedbackList:any=[];
  BookingInstanceID:any[] = [];
  ID:number = 0;
  chartScoreList:any =[];
  chartData:number[] = [];
  Friendliness:number = 0;
  Ability:number = 0;
  Timeliness:number = 0;
  TutorId: number = 0;
  SessionDetailsList:any = [];
  TutorName:any;
  Date:any;
  sessionxv: any;
  date:any;
  sentance:string="";
tutorsentance:string="";
sessiondate:string="";


  constructor(
    private reportService: ReportingService,
    private router: Router,private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getSessionDropdown();
    this.barChartData = [{ data: [0,0,0], label: 'Session Feedback Score' }, ];

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


  getSessionDropdown(){
    this.reportService.getFeedbackSessionDropdown().subscribe((result) => {
      this.SessionList = result;
      console.log(this.SessionList);
    });
   }



   changeSession(value) {

  this.BookingInstanceID = value;

  }

getFeedbackList(){
this.ID = this.BookingInstanceID[0];
this.TutorId = this.BookingInstanceID[1];
this.reportService.getFeedbackList(this.ID).subscribe((result) =>{
  this.FeedbackList = result;
  this.totalLength1 = this.FeedbackList.length;

})

this.reportService.getSessionDetails(this.ID).subscribe((result) =>{
  this.SessionDetailsList = result;
  console.log(this.SessionDetailsList);

  this.TutorName = this.SessionDetailsList.tutor.tutorName + ' ' + this.SessionDetailsList.tutor.tutorSurname;
  this.Date = this.SessionDetailsList.date;
})

//Chartscore list
this.reportService.getSessionFeedbackScore(this.ID).subscribe((result) =>{
  this.chartScoreList = result;
  console.log(this.chartScoreList);
  this.chartData = this.chartScoreList;
  this.Friendliness = this.chartScoreList.Friendliness;
  this.Ability = this.chartScoreList.Ability;
  this.Timeliness = this.chartScoreList.Timliness;



  this.barChartData = [{ data: [this.Friendliness,this.Timeliness,this.Ability],
                         label: 'Session Feedback Score',
                         backgroundColor:'rgb(0, 204, 204)',
                         pointBackgroundColor:'rgb(179, 240, 255)',
                         pointHoverRadius: 0,
                         hoverBackgroundColor:'rgb(128, 229, 255)', }];

                      })







}


//ng2-chart [Barchart FeedbackScore]
public barChartOptions: ChartOptions = {
  responsive: true,
  tooltips:{
    backgroundColor: 'rgb(26, 117, 255)',
    borderColor: 'green'
  },
 legend: {
   labels:{
     boxWidth:60
   }
 },
  scales: {
    yAxes: [
      {
        position: 'left',
        ticks: {
          max: 10,
          min: 0
        }
      }
    ]
  }
};
public barChartLabels: Label[] = ['Friendliness','Ability','Timeliness'];
public barChartType: ChartType = 'bar';
public barChartLegend = true;
public barChartPlugins = [];
public barChartData: ChartDataSets[] = [
  { data: [0,0,0], label: 'Session Feedback Score',
  backgroundColor:'rgb(0, 204, 204)',
  pointBackgroundColor:'rgb(179, 240, 255)',
  pointHoverRadius: 0,
  hoverBackgroundColor:'rgb(128, 229, 255)',
   }
]



public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

public RedirectReportHome(){
  this.router.navigateByUrl('/report-home');

}

public DownloadPDF():void {
  this.tutorsentance="Selected tutor: " + this.TutorName;
this.sessiondate = "Session date: " + this.Date;
  var imgs = new Image();
var src = "../.././assets/pics/HD logo.png";
imgs.src = src;
  let data = document.getElementById('Feedback');
  let datas = document.getElementById('Feedbackgrapgh');
  this.date=new Date();
  let latest_date =this.datePipe.transform(this.date, 'dd-MM-yyyy');
 this.sentance = "Date generated:"+latest_date;
 html2canvas(datas).then(canvass => {this.fx = canvass.toDataURL('image/png')})
  html2canvas(data).then(canvas => {
    
      
      let fileWidth = 140;
      let fileHeight = canvas.height * fileWidth / canvas.width;
      
      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      PDF.addImage(imgs, 'PNG', 10, 5, 25, 25)
      let position = 0;
      PDF.setFontSize(10);
      PDF.setFont(undefined, 'bold')
      PDF.text("Student comments",90,78);
      PDF.addImage(FILEURI, 'PNG', 35, 80, fileWidth, fileHeight)
      PDF.setFont(undefined, 'bold')
      PDF.text("Feedback score",93,158);
      PDF.addImage(this.fx, 'PNG', 35, 160, fileWidth, 70)
      PDF.setFontSize(22);
      PDF.setFont(undefined, 'bold')
      PDF.text("Tutor feedback report",68,20);
      PDF.setFontSize(9);
      PDF.setFont(undefined, 'normal')
      PDF.text("Description: Report displays comments made by students on the tutor and a grapgh displaying the average review score ",15,40);
      PDF.text("Generated by: Admin.",15,45);
      PDF.text(this.sentance,15,50);
      PDF.text(this.tutorsentance,15,55);
      PDF.text(this.sessiondate,15,60);
      PDF.save('TutorDetailsReport.pdf');
  });     
}




}
