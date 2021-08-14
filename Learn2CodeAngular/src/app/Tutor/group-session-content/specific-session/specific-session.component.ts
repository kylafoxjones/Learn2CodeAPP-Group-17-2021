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
delete(id:number){

  Swal.fire({
    title: 'Are you sure you want to delete the content?',
    text: '',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes',
  }).then((result) => {
    if (result.isConfirmed) {
      this.service.deleteContent(id).subscribe((result) => {
       // this.getAllModules();
      });
      Swal.fire('Successful Deletion', '', 'success');
    }
  });
}

SessionContent(){
  const dialogRef = this.dialog.open(AddGroupSessionContentComponent, {
    width: '350px',
  });
  dialogRef.afterClosed().subscribe((result) => {
   // this.getAllSessionContent();
  });
}

}
