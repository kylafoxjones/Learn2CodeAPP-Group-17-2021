import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { TutorService } from '../../tutor resources/tutor.service';
import { AddGroupSessionContentComponent } from '../add-group-session-content/add-group-session-content.component';

@Component({
  selector: 'app-specific-session',
  templateUrl: './specific-session.component.html',
  styleUrls: ['./specific-session.component.scss']
})
export class SpecificSessionComponent implements OnInit {
//contentType:any;
sessioncat = this.service.sessionContentCat;
  constructor(public dialog: MatDialog, private service: TutorService) { }

  ngOnInit(): void {
    //this.getCategory();
  }

// getCategory(){
// this.service.getSessionContentType().subscribe((result)=>{
// this.contentType=result;
// console.log(this.contentType);
//  }
//  );
// }


SessionContent(){
  const dialogRef = this.dialog.open(AddGroupSessionContentComponent, {
    width: '350px',
  });
  dialogRef.afterClosed().subscribe((result) => {
   // this.getAllSessionContent();
  });
}

}
