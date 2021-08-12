import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-feedback-report',
  templateUrl: './feedback-report.component.html',
  styleUrls: ['./feedback-report.component.scss']
})
export class FeedbackReportComponent implements OnInit {

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
