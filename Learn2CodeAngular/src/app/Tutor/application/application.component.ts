import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2';
import { TutorService } from '../tutor resources/tutor.service';
import { PickModulesComponent } from './pick-modules/pick-modules.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
  imageURL: string;
  data: any = {};
  file: any;
  photo: any;
  moduleChosen: any;
  formdata = new FormData();
  moduleList: any = [];
  info: any;
  modulexv: any;
  picture: any;
  cv:any;
  url:any;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(private router: Router, private service: TutorService,public dialog: MatDialog) {}

  ngOnInit() {
    this.service.getApplicationModules().subscribe((res) => {
      this.moduleList = res;
      console.log('all the modules', this.moduleList);
    });
    
     this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  
  selectModule($event) {
    //get module chosen as input from user in dropdown
    this.moduleChosen = $event;
    console.log('module chosen', this.moduleChosen);
  }

  CVfile(event) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
    console.log('the cv file', this.file);
  }

  proPic(event) {
    console.log(event.target.files[0]);
    this.photo = event.target.files[0];
    
    console.log('the cv file', this.file);
    const files = event.target.files;
    if (files.length === 0)
        return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      
        return;
    }

    const reader = new FileReader();
    this.imageURL = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
        this.url = reader.result; 
    }
  }

  pickModules(){
    const dialogRef = this.dialog.open(PickModulesComponent, {
      width: '900px',
    });
    dialogRef.afterClosed().subscribe((result) => {
     
    });
  }

  submit() {
    let X = new FormData();
    X.append('tutorName', this.data.name);
    X.append('tutorSurname', this.data.surname);
    X.append('tutorCell', this.data.cell);
    X.append('tutorAbout', this.data.about);
    X.append('tutorPhoto', this.photo);
    X.append('file', this.file);
    X.append('tutorEmail', this.data.email);
    X.append('moduleId', this.moduleChosen);
    Swal.fire({
      title: 'Are you sure you want to apply?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.applyToBecomeTutor(X).subscribe(
          (result) => {
            this.info = result;
            Swal.fire('Application successful!', this.info.message, 'success');
            this.router.navigate(['/loginhomepage/login']);
          },
          (error) => {
            Swal.fire('Error!', error.error, 'error');
          }
        );
      }
    });
  }
}
