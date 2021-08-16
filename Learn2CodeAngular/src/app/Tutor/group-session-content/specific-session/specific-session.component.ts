import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { TutorService } from '../../tutor resources/tutor.service';
import { AddGroupSessionContentComponent } from '../add-group-session-content/add-group-session-content.component';
import { Router } from '@angular/router';

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

hasContentTs:any=this.service.hasContent;


  constructor(public dialog: MatDialog, private service: TutorService, private router: Router) { }

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
if (this.category != {})
{
  this.hasContentTs=true;
}
console.log("has Content ",this.hasContentTs);
  });


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
       this.hasContentTs=false;
       this.category= {};
    
       //this.getCategory();
      });
      Swal.fire('Successful Deletion', '', 'success');
      this.router.navigate(["/specificsession"]);
    }
  });
}

openAdd(){
  this.service.edit = false;   
  this.service.editId = 0;
  this.service.editCont = {};
  this.service.title = 'Add session content';
  const dialogRef = this.dialog.open(AddGroupSessionContentComponent, {
    width: '350px',
  });
  dialogRef.afterClosed().subscribe((result) => {
    this.getSessionContent();
  });
}

openEdit(obj){
  this.service.edit = true;
  this.service.editCont = obj;
 // this.service.oldContName = obj.moduleCode;
 // this.service.contents = this.service.contentList;
  this.service.editId = obj.id;
  console.log(this.service.editId);
  this.service.title = 'Edit session content';
  console.log(this.service.title);
  const dialogRef = this.dialog.open(AddGroupSessionContentComponent, {
    width: '350px',
  });
  dialogRef.afterClosed().subscribe((result) => {
   
  });
}
}
