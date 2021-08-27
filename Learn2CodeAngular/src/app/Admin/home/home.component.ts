import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import Swal from 'sweetalert2';
import {
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
  SingleDataSet,
} from 'ng2-charts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import * as Chart from 'chart.js';
import { title } from 'process';
import { Router } from '@angular/router';
import { ReportingService } from 'src/app/Report/Report resources/reporting.service';
import { AdminService } from '../admin resources/admin.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  //variables
  numOfStudents:any;
  numOfTutors: any;
  numOfUniversities:any;
  numOfModules:any;
  numOfDegrees:any;
  StudentUniData: any[] = [];
  CourseData: any[] = [];

  //functions
  TotalStudents(){
    this.adminService.getTotalStudents().subscribe((result) => {
      this.numOfStudents = result;
      console.log(this.numOfStudents);
    })
  }

  TotalTutors(){
    this.adminService.getTotalTutors().subscribe((result) => {
      this.numOfTutors = result;
      console.log(this.numOfTutors);
    })
  }

  
  TotalUniversities(){
    this.adminService.getTotalUniversities().subscribe((result) => {
      this.numOfUniversities = result;
      console.log(this.numOfUniversities);
    })
  }

  TotalDegrees(){
    this.adminService.getTotalDegrees().subscribe((result) => {
      this.numOfDegrees = result;
      console.log(this.numOfDegrees);
    })
  }

  TotalModules(){
    this.adminService.getTotalModules().subscribe((result) => {
      this.numOfModules = result;
      console.log(this.numOfModules);
    })
  }

  StudentUniGraph(){
    this.adminService.getStudentUniGraphData().subscribe((result) => {
      this.StudentUniData = result;
      console.log(this.StudentUniData);
    })
  }

  CoursePieGraphData(){
    this.adminService.getCoursePieGraphData().subscribe((result) => {
      this.CourseData = result;
      console.log(this.CourseData);
    })
  }

    //Student Uni Bar chart options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'University Name';
    showYAxisLabel = true;
    yAxisLabel = 'Number of students';
  
    colorScheme = {
      domain: ['#096E94', '#3CC0F2', '#606664', '#0F926A', '#834111']
    };
  
   

  // CourseCHart options
  
  gradient1: boolean = true;
  showLegend1: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = true;
  legendPosition: string = 'right';

  colorScheme1 = {
    domain: ['#7E3D27', '#7A7E27', '#277E5A', '#53277E','#7E273C','#50277E']
  };


  public DownloadUniPDF():void {
    let data = document.getElementById('StudentOfUniData');
      
    html2canvas(data).then(canvas => {
        
        let fileWidth = 220;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('l', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 50, 50, fileWidth, fileHeight)
        
        PDF.save('StudentsOfUniversities.pdf');
    });     

    
  }

  public DownloadCoursePDF():void {
    let data = document.getElementById('CourseData');
      
    html2canvas(data).then(canvas => {
        
        let fileWidth = 200;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 5, 50, fileWidth, fileHeight)
        
        PDF.save('StudentsOfUniversities.pdf');
    });     

    
  }

  x(){
    Swal.fire(
      '',
      'Successfully downloaded report',
      'success'
    )
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: Router,
    private adminService : AdminService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.TotalStudents();
    this.TotalTutors();
    this.TotalUniversities();
    this.TotalModules();
    this.TotalDegrees();
    this.StudentUniGraph();
    this.CoursePieGraphData();

  }

  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.route.navigate(['/loginhomepage/login']);
  };
  //   Swal.fire({

  //     icon: 'warning',
  //     title: 'Are you sure you want to logout',
  //     confirmButtonText: 'Confirm',

  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     cancelButtonText: 'Cancel'

  //   })
  // }
}
