import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AddEditResourceCategoryComponent } from './add-edit-resource-category/add-edit-resource-category.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TutorService } from '../tutor resources/tutor.service';
import { NbAccordionItemHeaderComponent } from '@nebular/theme';

@Component({
  selector: 'app-resource-category',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './resource-category.component.html',
  styleUrls: ['./resource-category.component.scss'],
})
export class ResourceCategoryComponent implements OnInit {
  //declare variables
  categoryList: any = [];
  category: any;
  search;
  listOfResources:any=[];


  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: TutorService
  ) {}

  ngOnInit() {
    this.getModules();
    this.getAllResourceCategories();
this.getModuleReso();

  }

  delete(id: number) {
    Swal.fire({
      title: 'Are you sure you want to delete the Resource Category?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteResourceCategories(id).subscribe((result) => {
          this.getAllResourceCategories();
        });
        Swal.fire('Successful Deletion', '', 'success');
      }
    });
  }

  openAddDialog() {
    this.service.edit = false;
    this.service.editId = 0;
      //fill a object place holder when add is clicked with nothing
      this.service.editCat = {};
    this.service.title = 'Create Resource Category';
    const dialogRef = this.dialog.open(AddEditResourceCategoryComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllResourceCategories();
    });
  }

  openEditDialog(obj) {
    this.service.edit = true;
        //fill the object place holder when edit is clicked
    this.service.editCat = obj;
    this.service.oldCatName = obj.categoryName;
    this.service.categories = this.categoryList;
    this.service.editId = obj.id;
    this.service.title = 'Edit Category Resource';
    const dialogRef = this.dialog.open(AddEditResourceCategoryComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllResourceCategories();
    });
  }

  getAllResourceCategories() {
    this.service.getResourceCategories().subscribe((result) => {
      this.categoryList = result; 
    });
  }
  specificResource(obj){
    console.log(obj);
    this.service.moduleIdToSend=3;
    
      this.router.navigateByUrl('/specificresource');
  }
 
getModuleReso(){
 // console.log("the module id ",this.service.moduleIdToSend);
  this.service.getModuleResources(this.service.moduleIdToSend).subscribe((result)=> {
this.service.Resourcecontent=result;
console.log("content for resource that was chosen",this.service.Resourcecontent);
//this.getCategory();
  });
}

getModules(){
  this.service.getModules().subscribe((result)=> {
this.listOfResources=result;
console.log("list of modules ",this.listOfResources);

});
}


}
