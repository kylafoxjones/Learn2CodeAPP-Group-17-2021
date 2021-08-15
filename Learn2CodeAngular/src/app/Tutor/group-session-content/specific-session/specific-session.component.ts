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
title=this.service.SessionTitle;
content:any=[];
categoryList:any=[];
category:any;
  constructor(public dialog: MatDialog, private service: TutorService) { }

  ngOnInit(){
  
    this.getSessionContent();
  }

getSessionContent(){
  console.log("the bookinginstance id ",this.service.bookinginstance.id);
  this.service.getContentForSession(this.service.bookinginstance.id).subscribe((result)=> {
this.content=result;
console.log("content for session that was chosen",this.content);
this.getCategory();
  });

}
getCategory(){
  this.service.getSessionContentType().subscribe((result)=>{
this.categoryList=result;
console.log("Category list",this.categoryList);
this.category = this.categoryList.find(obj => {
  return obj.id === this.content[0].sessionContentCategoryId
})
console.log("category for content ",this.category);
  });
 // this.category = this.categoryList.find((x) => x.id === this.content[0].sessionContentCategoryId);

}
delete(obj){
console.log("for delete",obj);
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
     this.service.deleteContent(obj.id).subscribe((result) => {
       // this.getAllModules();
      });
      Swal.fire('Successful Deletion', '', 'success');
    }
  });
}

openAdd(){
  
  const dialogRef = this.dialog.open(AddGroupSessionContentComponent, {
    width: '350px',
  });
  dialogRef.afterClosed().subscribe((result) => {
   // this.getAllSessionContent();
  });
}

openEdit(){

}
}
