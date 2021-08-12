import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-total-students-report',
  templateUrl: './total-students-report.component.html',
  styleUrls: ['./total-students-report.component.scss']
})
export class TotalStudentsReportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  x(){
    Swal.fire(
      '',
      'Successfully downloaded report',
      'success'
    )
  }

}
