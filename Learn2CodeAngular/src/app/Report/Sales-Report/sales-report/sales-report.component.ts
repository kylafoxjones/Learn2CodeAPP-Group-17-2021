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

  //object instance to send to service
  ObjectToSend: any = {};
  //object details
  Start: any;
  End: any;
  exportStud: any;

  //Lists
  SubscriptionReportTable: any = [];
  SubscriptionSummary: any = [];
  CourseGraph: any[] = [];

  constructor(
    private router: Router,
    private ReportService: ReportingService
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
      saveAs(res, 'test'+  '.xlsx');
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

  
}


