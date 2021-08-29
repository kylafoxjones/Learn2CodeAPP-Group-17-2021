import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AddEditResourceCategoryComponent } from './add-edit-resource-category/add-edit-resource-category.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TutorService } from '../tutor resources/tutor.service';
import { NbAccordionItemHeaderComponent } from '@nebular/theme';
import { MatMenuModule } from '@angular/material/menu';

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
  listOfResources: any = [];
  uniList: any;
  uniResoList: any;
  hasContent: any = false;
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

    this.getModuless();
    this.getAllResourceCategories();
    // this.getUnisResource();
    this.getUniss();
    //this.getModuleReso();
  }

  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };
  
  selectType($event) {
    // console.log('this is the event', $event);
    this.service.typeUniChosen = $event;
    console.log('this is the event', this.service.typeUniChosen);
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
  getUniss() {
    this.service.getUnis().subscribe((result) => {
      this.uniList = result;
      console.log('university list ', this.uniList);
    });
  }
  getUnisResource() {
    console.log('type uni', this.service.typeUniChosen);
    this.service
      .getUnivForResources(this.service.typeUniChosen)
      .subscribe((result) => {
        this.uniResoList = result;
        console.log('university resource list ', this.uniResoList);
        if (this.uniResoList.length == 0) {
          this.hasContent = false;
        } else {
          this.hasContent = true;
        }
        console.log('has Content ', this.hasContent);
      });
  }
  getAllResourceCategories() {
    this.service.getResourceCategories().subscribe((result) => {
      this.categoryList = result;
    });
  }
  specificResource(obj) {
    console.log(obj);
    this.service.moduleIdToSend = obj.id;
    this.service.moduleNameToSend = obj.moduleCode;
    this.service.universityID = obj.degree.universityID;
    console.log('university is: ', this.service.universityID);
    console.log('module code is : ', this.service.moduleNameToSend);
    console.log('module is : ', this.service.moduleIdToSend);
    this.router.navigateByUrl('/specificresource');
  }

  getModuleReso() {
    // console.log("the module id ",this.service.moduleIdToSend);
    this.service
      .getModuleResources(this.service.moduleIdToSend)
      .subscribe((result) => {
        this.service.Resourcecontent = result;
        console.log(
          'content for resource that was chosen',
          this.service.Resourcecontent
        );
        //this.getCategory();
      });
  }

  getModuless() {
    this.service.getModules().subscribe((result) => {
      this.listOfResources = result;
      console.log('list of modules ', this.listOfResources);
    });
  }
}
