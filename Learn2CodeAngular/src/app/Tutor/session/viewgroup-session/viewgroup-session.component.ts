import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TutorService } from '../../tutor resources/tutor.service';

@Component({
  selector: 'app-viewgroup-session',
  templateUrl: './viewgroup-session.component.html',
  styleUrls: ['./viewgroup-session.component.scss']
})
export class ViewgroupSessionComponent implements OnInit {
List:any =[];
//pagination
totalLength: any;
page: number = 1;
page1: number = 1;
totalLength1: any;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private service: TutorService, public dialogref: MatDialogRef<ViewgroupSessionComponent>) { }

  ngOnInit(): void {
    console.log("this is the id sent",this.data);
    this.refreshList();
    
  }
  refreshList() {
    this.service.Getgroupreg(this.data).subscribe((result) => {
      this.List = result as [] ;
      console.log("aa",this.List);
    });
  }
  cancel() {
    this.dialogref.close(null);
  }

}
