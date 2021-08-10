import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TutorService } from '../../tutor resources/tutor.service';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class CreateMessageComponent implements OnInit {
  student:any;
  data: any = {};
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: TutorService
  ) { }

  ngOnInit(
  ) {
    this.student= this.service.studentObj;
  }

sendMessage(){


}

}
