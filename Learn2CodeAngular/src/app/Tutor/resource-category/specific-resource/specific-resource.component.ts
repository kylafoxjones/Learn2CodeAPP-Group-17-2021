import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TutorService } from '../../tutor resources/tutor.service';
import { AddEditResourceComponent } from '../add-edit-resource/add-edit-resource.component';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-specific-resource',
  templateUrl: './specific-resource.component.html',
  styleUrls: ['./specific-resource.component.scss'],
})
export class SpecificResourceComponent implements OnInit {
  search;
  List = this.service.specificList;
  module = this.service.moduleNameToSend;
  file: any;
  tutor: any;
  userId: any;

   //pagination
   page1:number = 1;
   totalLength1:any;
   
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: TutorService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('id');
    console.log(this.userId);
    this.service.getTutor(this.userId).subscribe((result) => {
      this.tutor = result;});
    this.getAllForModule();
  }

   public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };
  
  download(obj) {
    console.log('object is ', obj);
    this.service.downloadResource(obj.id).subscribe((blob) => {
      this.file = blob;
      console.log('file is ', this.file);
      console.log(obj.resourceCategory.resourceCategoryName);
      saveAs(blob, obj.resourceCategory.resourceCategoryName);
    });
  }
  getAllForModule() {
    this.service
      .getModuleResources(this.service.moduleIdToSend)
      .subscribe((result) => {
        this.List = result;
        console.log('all for module', this.List);
      });
  }

  openAddDialog() {
    this.service.edit = false;
    this.service.editId = 0;
    //fill a object place holder when add is clicked with nothing
    this.service.editCat = {};
    this.service.title = 'Add Resource To: ';
    const dialogRef = this.dialog.open(AddEditResourceComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllForModule();
    });
  }

  openEditDialog(obj) {
    console.log('the obj is', obj);
    this.service.edit = true;
    this.service.newResource = obj.resourceDescription;
    console.log(this.service.newResource); //gives the secription of the old one
    // this.service.oldContName = obj.moduleCode;
    // this.service.contents = this.service.contentList;
    this.service.editId = obj.id;
    console.log(this.service.editId);
    this.service.title = 'Edit Resource';
    console.log(this.service.title);
    const dialogRef = this.dialog.open(AddEditResourceComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllForModule();
    });
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Are you sure you want to delete the Resource?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteResources(id).subscribe((result) => {
          this.getAllForModule();
        });
        Swal.fire('Successful Deletion', '', 'success');
      }
    });
  }
}
