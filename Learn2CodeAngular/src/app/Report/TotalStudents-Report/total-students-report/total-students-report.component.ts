import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { ReportingService } from '../../Report resources/reporting.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-total-students-report',
  templateUrl: './total-students-report.component.html',
  styleUrls: ['./total-students-report.component.scss']
})
export class TotalStudentsReportComponent implements OnInit {

  totalLength:any;
  page:number = 1;
  studentList:any= [];

  constructor(  
    private reportService: ReportingService,
    private router: Router ) { }

  ngOnInit(){
    this.getStudentDetails();
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

  getStudentDetails() {
    
    this.reportService.getTotalStudents().subscribe((result) => {
      this.studentList = result; 
      this.totalLength = this.studentList.length;
      console.log(this.studentList);
    });
  }



  public DownloadPDF():void {
    let data = document.getElementById('TutorDetailsData');
      
    html2canvas(data).then(canvas => {
        
        let fileWidth = 240;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save('TotalStudentsReport.pdf');
    });     
  }

  public RedirectReportHome(){
    this.router.navigateByUrl('/report-home');
  }








}
