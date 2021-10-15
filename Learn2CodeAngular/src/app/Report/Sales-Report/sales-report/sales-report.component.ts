import { Component, OnInit } from '@angular/core';
import { ReportingService } from '../../Report resources/reporting.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { ChartsModule, Color, Label, BaseChartDirective} from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
//import { BaseChartDirective } from 'ng2-charts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NbLayoutComponent } from '@nebular/theme';
import { NbLayoutColumnComponent } from '@nebular/theme';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss'],
})
export class SalesReportComponent implements OnInit {
  //pagination
  totalLength: any;
  page: number = 1;
  page1: number = 1;
  totalLength1: any;
  fx:any;
hidden:boolean = false;
  //object instance to send to service
  ObjectToSend: any = {};
  //object details
  Start: any;
  End: any;
  exportStud: any;
  date:any;
  sentance:string="";

  //Lists
  SubscriptionReportTable: any = [];
  SubscriptionSummary: any = [];
  CourseGraph: any[] = [];

  constructor(
    private router: Router,
    private ReportService: ReportingService,private datePipe: DatePipe
  ) {}


  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };

  ngOnInit(): void {
    this.getSubscriptionSummaryData(), this.getCourseGraphData();
  }

  x() {
    Swal.fire('', 'Successfully downloaded report', 'success');
  }
  // exportpay(){
  //   this.ReportService.export(this.Start, this.End).subscribe((res) => {
  //     saveAs(res, 'test'+  '.xlsx');
  //   });
  // }
 // getSubscriptionSalesTable(){
  exportpay(){
    this.ObjectToSend.StartDate = this.Start;
    this.ObjectToSend.EndDate = this.End;
    this.ReportService.export(this.ObjectToSend).subscribe((res) => {
      saveAs(res, 'sales report excel'+  '.xlsx');
    });
  }
 

  


  getSubscriptionSalesTable() {
    this.ObjectToSend.StartDate = this.Start;
    this.ObjectToSend.EndDate = this.End;
    console.log(this.ObjectToSend);

    this.ReportService.GetSalesReportTable(this.ObjectToSend).subscribe(
      (result) => {
        this.SubscriptionReportTable = result;
        this.totalLength = this.SubscriptionReportTable.length;

        console.log(this.SubscriptionReportTable);
      }
    );
  }

    getSubscriptionSummaryData() {
    this.ReportService.GetSubscriptionSales().subscribe((result) => {
      console.log(result);
      this.SubscriptionSummary = result;
      this.totalLength1 = this.SubscriptionSummary.length;
      console.log(this.SubscriptionSummary);
    });
  }

  getCourseGraphData() {
    this.ReportService.GetCourseSales().subscribe((result) => {
      this.CourseGraph = result;

      console.log(this.CourseGraph);
    });
  }

  //Export to excel
  // exportExcel() {
  //   this.ReportService.export(this.Start, this.End).subscribe((result) => {
  //     saveAs(result, 'Subscription Sales' + '.xlsx');
  //   });
  // }



  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Course Name';
  showYAxisLabel = true;
  yAxisLabel = 'Total Amount in R';

  colorScheme = {
    domain: ['#096E94', '#3CC0F2', '#606664', '#0F926A', '#834111'],
  };

  public RedirectReportHome() {
    this.router.navigateByUrl('/report-home');
  }

  public DownloadPDF(): void {
    let data = document.getElementById('SalesData');

    html2canvas(data).then((canvas) => {
      let fileWidth = 300;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('l', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('SalesReport.pdf');
    });
  }

  public DownloadPDFsub():void {
  
console.log("sssss")
    var imgs = new Image();
  var src = "../.././assets/pics/HD logo.png";
  imgs.src = src;
    let data = document.getElementById('table');
    let datas = document.getElementById('chart');
    
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
        PDF.text("Total sales amount per subscription",80,78);
        PDF.addImage(FILEURI, 'PNG', 50, 80, 110, 45)
        PDF.setFont(undefined, 'bold')
        PDF.text("Course sales grapgh",88,158);
        PDF.addImage(this.fx, 'PNG', 46, 171, 120, 70)
        
      
        PDF.setFontSize(22);
        PDF.setFont(undefined, 'bold')
        PDF.text("Sales report",82,20);
        PDF.setFontSize(9);
        PDF.setFont(undefined, 'normal')
        PDF.text("Description: Report displays the total amount of sales per subscription and the Rand value of the total sales per course.",15,40);
        PDF.text("Generated by: Admin.",15,45);
        PDF.text(this.sentance,15,50);
        
       
        
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
  
  
  
        PDF.save('sales.pdf');
    });     
  }


  public DownloadPDFtable():void {
    this.hidden = true;
    document.getElementById('hiddentable').style.display = ''
    
    console.log(this.hidden);
    var imgs = new Image();
  var src = "../.././assets/pics/HD logo.png";
  imgs.src = src;
 
    let data = document.getElementById('hiddentable');
    this.date=new Date();
    let latest_date =this.datePipe.transform(this.date, 'dd-MM-yyyy');
    let begindate = this.datePipe.transform(this.Start, 'dd-MM-yyyy');
    let endndate = this.datePipe.transform(this.End, 'dd-MM-yyyy');
    let zz = "Start date: " + begindate;
    let zzz = "End date: " + endndate
   this.sentance = "Date generated:"+latest_date;
    html2canvas(data).then(canvas => {
        
        let fileWidth = 150;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        PDF.addImage(imgs, 'PNG', 10, 5, 25, 25)
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 25, 70, fileWidth, fileHeight)
        PDF.setFontSize(22);
        PDF.setFont(undefined, 'bold')
        PDF.text("CSV payment report",70,20);
        PDF.setFontSize(9);
        PDF.setFont(undefined, 'normal')
        PDF.text("Description: Table displays list of of payments between two dates",15,40);
        PDF.text("Generated by: Admin.",15,45);
        PDF.text(this.sentance,15,50);
        PDF.text(zz,15,55);
        PDF.text(zzz,15,60);
        PDF.save('Payment.pdf');
        this.hidden=false;
       document.getElementById('hiddentable').style.display = 'none'
    });     
  }

  
}


