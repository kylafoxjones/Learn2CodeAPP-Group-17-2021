import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tutor-session-report',
  templateUrl: './tutor-session-report.component.html',
  styleUrls: ['./tutor-session-report.component.scss']
})
export class TutorSessionReportComponent implements OnInit {

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
