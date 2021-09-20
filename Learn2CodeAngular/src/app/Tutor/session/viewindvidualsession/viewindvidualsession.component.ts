import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TutorService } from '../../tutor resources/tutor.service';

@Component({
  selector: 'app-viewindvidualsession',
  templateUrl: './viewindvidualsession.component.html',
  styleUrls: ['./viewindvidualsession.component.scss']
})
export class ViewindvidualsessionComponent implements OnInit {
booking:any;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private service: TutorService, public dialogref: MatDialogRef<ViewindvidualsessionComponent>) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.service.Getindreg(this.data).subscribe((result) => {
      this.booking = result  ;
      console.log("aa", this.booking);
    });
  }
  cancel() {
    this.dialogref.close(null);
  }

}
