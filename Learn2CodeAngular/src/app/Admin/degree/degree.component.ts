import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddEditDegreeComponent } from './add-edit-degree/add-edit-degree.component';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminService } from '../admin resources/admin.service';

@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.scss'],
})
export class DegreeComponent implements OnInit {
  //declare variables
  degreeList: any = [];
  degree: any;
  search;

  constructor(
    public dialog: MatDialog,
    private service: AdminService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllDegrees();
  }

  delete(id: number) {
    Swal.fire({
      title: 'Are you sure you want to delete the degree?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteDegree(id).subscribe((result) => {
          this.getAllDegrees();
        });
        Swal.fire('Successful Deletion', '', 'success');
      }
    });
  }

  openAddDialog() {
    this.service.edit = false;
    this.service.editId = 0;
    this.service.title = 'Create degree';
    const dialogRef = this.dialog.open(AddEditDegreeComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllDegrees();
    });
  }

  openEditDialog(obj) {
    this.service.edit = true;
    this.service.editDeg = obj;
    this.service.oldDegreeName = obj.degreeName;
    this.service.degrees = this.degreeList;
    this.service.editId = obj.id;
    this.service.title = 'Edit degree';
    const dialogRef = this.dialog.open(AddEditDegreeComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllDegrees();
    });
  }
  getAllDegrees() {
    this.service.getDegrees(this.service.universityIdToSend).subscribe((result) => {
      this.degreeList = result; //uni list is populated
    });
  }
}
