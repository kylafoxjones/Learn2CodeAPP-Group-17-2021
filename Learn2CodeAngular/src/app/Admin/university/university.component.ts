import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUniversityComponent } from './add-edit-university/add-edit-university.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminService } from '../admin resources/admin.service';
import { NbAccordionItemHeaderComponent } from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss'],
})
export class UniversityComponent implements OnInit {

  //pagination
  totalLength:any;
  page:number = 1;
  //declare variables
  universityList: any = [];
  university: any;
  search;

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
        this.service.deleteUniversity(id).subscribe((result) => {
          this.getAllUniversities();
        });
        Swal.fire('Successful Deletion', '', 'success');
      }
    });
  }

  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };

  openAddDialog() {
    this.service.edit = false;
    this.service.editId = 0;
    //fill a object place holder when add is clicked with nothing
    this.service.editUni = {};
    this.service.title = 'Create University';
    const dialogRef = this.dialog.open(AddEditUniversityComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllUniversities();
    });
  }

  openEditDialog(obj) {
    this.service.edit = true;
    //fill the object place holder when edit is clicked
    this.service.editUni = obj;
    this.service.oldUniName = obj.universityName;
    this.service.unis = this.universityList;
    this.service.editId = obj.id;
    this.service.title = 'Edit University';
    const dialogRef = this.dialog.open(AddEditUniversityComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllUniversities();
    });
  }

  getAllUniversities() {
    this.service.getUniversities().subscribe((result) => {
      this.universityList = result; //uni list is populated
      this.totalLength = this.universityList.length;
    });
  }

  navigateToDegree(id: number) {
    this.service.universityIdToSend = id;
    this.router.navigateByUrl('/degree');
  }
}
