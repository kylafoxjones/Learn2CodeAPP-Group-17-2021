import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TutorService } from '../tutor resources/tutor.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
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

  constructor(private router: Router, private service: TutorService) {}

  ngOnInit() {
    this.service.getApplicationModules().subscribe((res) => {
      this.moduleList = res;
      console.log('all the modules', this.moduleList);
    });
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
