import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin resources/admin.service';

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-course-content',
  templateUrl: './add-course-content.component.html',
  styleUrls: ['./add-course-content.component.scss'],
})
export class AddCourseContentComponent implements OnInit {
  types: Type[] = [
    { value: '1', viewValue: 'Notes' },
    { value: '2', viewValue: 'Video' },
  ];

  typeChosen: any;
  typeList: any = [];
  constructor(private service: AdminService) {}

  ngOnInit(): void {}

  content(event) {
    let data = new FormData();
    data.append('courseSubCategoryId', this.service.courseContentCat.id);
    data.append('contentTypeId', this.typeChosen);
    data.append('content', event.target.files[0]);
    this.service.posttfile(data).subscribe((res) => {
      console.log(res);
    });
  }

  // getTypeList() {
  //   this.service.getSessionTypes().subscribe((result) => {
  //     this.typeList = result;
  //     console.log('types from api', this.typeList);
  //   });
  // }

  selectType($event) {
    console.log('this is the event', $event);
    this.typeChosen = $event; //what is selected in the dropdown is sent back in this parameter to the api
    console.log(this.typeChosen);
  }
}
