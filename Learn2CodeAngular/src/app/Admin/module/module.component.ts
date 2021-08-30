import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../admin resources/admin.service';
import { AddEditModuleComponent } from './add-edit-module/add-edit-module.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss'],
})
export class ModuleComponent implements OnInit { 

  //pagination
  totalLength:any;
  page:number = 1;
  //declare variables
  moduleList: any = [];
  module: any;
  search;

  constructor(
    public dialog: MatDialog,
    private service: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllModules();
  }

  delete(id: number) {
    Swal.fire({
      title: 'Are you sure you want to delete the module?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteModule(id).subscribe((result) => {
          this.getAllModules();
        });
        Swal.fire('Successful Deletion', '', 'success');
      }
    },(error) => {
      Swal.fire('Error!', error.error, 'error');
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
    this.service.editMod = {};
    this.service.title = 'Create module';
    const dialogRef = this.dialog.open(AddEditModuleComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllModules();
    });
  }

  openEditDialog(obj) {
    this.service.edit = true;
    this.service.editMod = obj;
    this.service.oldModuleName = obj.moduleCode;
    this.service.modules = this.moduleList;
    this.service.editId = obj.id;
    this.service.title = 'Edit module';
    const dialogRef = this.dialog.open(AddEditModuleComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllModules();
    });
  }
  getAllModules() {
    this.service.getModules(this.service.degreeIdToSend).subscribe((result) => {
      this.moduleList = result; //uni list is populated

      this.totalLength = this.moduleList.length;
      console.log(
        'this is the degree id, the modules for this id should be displayed',
        this.service.degreeIdToSend
      );
    });
  }
}
