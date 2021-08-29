import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { StudentService } from '../Student resources/student.service';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-resources',
  templateUrl: './view-resources.component.html',
  styleUrls: ['./view-resources.component.scss'],
})
export class ViewResourcesComponent implements OnInit {
  thissStudent: any;
  userId: any;
  typeChosen: any;
  id: any;
  moduleList: any = [];
  search;
  hasContent: any = false;
  resourceList: any = [];
  constructor(
    private StudentService: StudentService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStudentInfo();
    this.getModule();
  }
  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };
  getStudentInfo() {
    //to get the student info for the circle at the top
    this.userId = localStorage.getItem('id');
    console.log(this.userId);
    this.StudentService.getStudent(this.userId).subscribe((result) => {
      this.thissStudent = result;
      console.log('student info on resource component', this.thissStudent);
    });
  }
  selectType($event) {
    console.log('this is the event', $event);
    this.typeChosen = $event;
    console.log(this.typeChosen);
  }
  getModule() {
    this.StudentService.getModulesForResource().subscribe((result) => {
      this.moduleList = result;
      console.log('modules from the api: ', this.moduleList);
    });
  }

  filter() {
    this.StudentService.getResourceByModule(this.typeChosen).subscribe(
      (result) => {
        this.resourceList = result;
        console.log(
          'resources for the specific module from the api: ',
          this.resourceList
        );
        if (this.resourceList.length != 0) {
          this.hasContent = true;
        } else {
          this.hasContent = false;
        }
        console.log('hasContent', this.hasContent);
      }
    );
  }

  download(obj) {
    console.log(obj);
    this.StudentService.downloadResource(obj.id).subscribe((blob) => {
      console.log('this is blob: ', blob);
      saveAs(blob, obj.resourceCategory.resourceCategoryName);
    });
  }
}
