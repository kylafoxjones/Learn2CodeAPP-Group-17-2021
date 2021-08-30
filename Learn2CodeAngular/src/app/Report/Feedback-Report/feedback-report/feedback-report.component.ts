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



  constructor(
    private reportService: ReportingService,
    private router: Router
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
  let data = document.getElementById('Feedback');

  html2canvas(data).then(canvas => {

      let fileWidth = 300;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('l', 'mm', 'a4');
      let position = 5;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save('FeedbackReport.pdf');
  });
}





}
