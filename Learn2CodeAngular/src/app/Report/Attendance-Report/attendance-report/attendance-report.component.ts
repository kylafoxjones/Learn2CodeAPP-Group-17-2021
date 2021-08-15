import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NbThemeModule, NbLayoutModule, NbSidebarComponent } from '@nebular/theme';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ReportingService } from '../../Report resources/reporting.service';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss']
})
export class AttendanceReportComponent implements OnInit {

  SessionList:any = [];


  constructor(
    private reportService: ReportingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.SessionDropdown()
  }
  x(){
    Swal.fire(
      '',
      'Successfully downloaded report',
      'success'
    )
  }


 SessionDropdown(){
  this.reportService.getSessionDropdown().subscribe((result) => {
    this.SessionList = result; 
    console.log(this.SessionList);
  });
 }

}