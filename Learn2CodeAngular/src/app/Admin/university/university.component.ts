import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUniversityComponent } from './add-edit-university/add-edit-university.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminService } from '../admin resources/admin.service';
import { University } from '../admin resources/university';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss'],
})
export class UniversityComponent implements OnInit {
  //declare variables
  universityList: any;
  university: any;
  

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: AdminService
  ) {}

  ngOnInit(): void {}

  delete() {
    Swal.fire({
      title: 'Are you sure you want to delete the University?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Successful Deletion', '', 'success');
      }
    });
  }

  openDialog() {
    //this.service.editId = 0;
    const dialogRef = this.dialog.open(AddEditUniversityComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  getAllUniversities() {
    this.service.getUniversities().subscribe((result) => {
      this.universityList = result; //uni list is populated
    });
  }
}
