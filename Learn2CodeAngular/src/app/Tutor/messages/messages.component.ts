import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {MatDialog} from '@angular/material/dialog';
import { AddEditMessagesComponent } from './add-edit-messages/add-edit-messages.component';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TutorService } from '../tutor resources/tutor.service';
import { NbAccordionItemHeaderComponent } from '@nebular/theme';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
 //declare variables
 studentMessageList: any = [];
 messages: any;
 search;
 
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: TutorService
  ) { }

  ngOnInit(): void {
    this.getAllMessages();

  }
  delete(id: number) {
    Swal.fire({
      title: 'Are you sure you want to delete the Message?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteMessages(id).subscribe((result) => {
          this.getAllMessages();
        });
        Swal.fire('Successful Deletion', '', 'success');
      }
    });
  }

  openAddDialog() {
    this.service.edit = false;
    this.service.editId = 0;
      //fill a object place holder when add is clicked with nothing
      this.service.editMessage = {};
    this.service.title = 'Create Message';
    const dialogRef = this.dialog.open(AddEditMessagesComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllMessages();
    });
  }


  getAllMessages() {
    this.service.getMessages().subscribe((result) => {
      this.studentMessageList = result; 
    });
  }

  // navigateToDegree(id:number){
  //   this.service.universityIdToSend=id;
  //   this.router.navigateByUrl('/degree');
  // }




}