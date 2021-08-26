import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AddEditSessionContentCategoryComponent } from './add-edit-session-content-category/add-edit-session-content-category.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminService } from '../admin resources/admin.service';
import { NbAccordionItemHeaderComponent } from '@nebular/theme';

@Component({
  selector: 'app-session-content-category',
  templateUrl: './session-content-category.component.html',
  styleUrls: ['./session-content-category.component.scss']
})
export class SessionContentCategoryComponent implements OnInit {
  //declare variables
  sessionContentCategoryList: any = [];
  sessionContentCategory: any;
  search;

  constructor( private router: Router,
    public dialog: MatDialog,
    private service: AdminService) { }

  ngOnInit() {
    this.getAllSessionContentCategories();
  }

  delete(id: number) {
    Swal.fire({
      title: 'Are you sure you want to delete the Session content category?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteSessionContentCategory(id).subscribe((result) => {
          this.getAllSessionContentCategories();
        });
        Swal.fire('Successful Deletion', '', 'success');
      }
    },(error) => {
      Swal.fire('Error!', error.error, 'error');
    });
  }

  openAddDialog() {
    this.getAdminId();
    this.service.edit = false;
    this.service.editId = 0;
    this.service.editSessionContentCat = {};
    this.service.title = 'Create session content category';
    const dialogRef = this.dialog.open(AddEditSessionContentCategoryComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllSessionContentCategories();
    });
  }

  openEditDialog(obj) {
    this.getAdminId();
    this.service.edit = true;
    this.service.editSessionContentCat = obj;
    console.log(this.service.editSessionContentCat);
    this.service.oldSessionContentCategoryName = obj.sessionContentCategoryName;
    this.service.sessionContentCategories = this.sessionContentCategoryList;
    this.service.editId = obj.id;
    this.service.title = 'Edit session content category';
    const dialogRef = this.dialog.open(AddEditSessionContentCategoryComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllSessionContentCategories();
    });
  }

  getAllSessionContentCategories() {
    this.service.getSessionContentCategories().subscribe((result) => {
      this.sessionContentCategoryList = result; //uni list is populated
    });
  }

  getAdminId(){
    this.service.adminId=1;
  }
}
