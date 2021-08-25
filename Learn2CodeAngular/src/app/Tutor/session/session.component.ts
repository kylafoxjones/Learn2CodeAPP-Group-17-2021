import { Component, OnInit } from '@angular/core';
import { CreateSessionComponent } from './create-session/create-session.component';
import { MatDialog } from '@angular/material/dialog';
import { TutorService } from '../tutor resources/tutor.service';
@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  constructor(  public dialog: MatDialog,   private service: TutorService) { }

  ngOnInit(): void {

  }

  openAddDialog(){
    const dialogRef = this.dialog.open(CreateSessionComponent, {
      width: '900px',
    });
    dialogRef.afterClosed().subscribe((result) => {
 
    });

  }



}
