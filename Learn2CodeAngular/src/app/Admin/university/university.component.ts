import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUniversityComponent } from './add-edit-university/add-edit-university.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminService } from '../admin resources/admin.service';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss'],
})
export class UniversityComponent implements OnInit {
  //declare variables
  universityList: any = [];
  university: any;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: AdminService
  ) {}

  ngOnInit() {
    this.getAllUniversities();
  }

  delete(id: number) {
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
        console.log(id);
        this.service.deleteUniversity(id).subscribe((result) => {
          this.getAllUniversities();
        });
        Swal.fire('Successful Deletion', '', 'success');
      }
    });
  }

  openAddDialog() {
    this.service.editId = 0;
    console.log(this.service.editId);
    this.service.title="Create University";
    const dialogRef = this.dialog.open(AddEditUniversityComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllUniversities();
    });
  }

  openEditDialog(obj) {
    this.service.editUni = obj;
    this.service.oldUniName = obj.UniversityName;
    this.service.unis=this.universityList;
    this.service.editId = obj.id;
    this.service.title="Edit University";
    console.log(this.service.editId);
    const dialogRef = this.dialog.open(AddEditUniversityComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllUniversities();
    });
  }

  getAllUniversities() {
    this.service.getUniversities().subscribe((result) => {
      console.log(result);
      this.universityList = result; //uni list is populated
    });
  }
}
