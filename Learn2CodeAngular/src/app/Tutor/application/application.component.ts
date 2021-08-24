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
  moduleChosen: any;
  formdata = new FormData();
  moduleList: any = [];

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

  submit() {
    console.log('the new tutor details', this.data);
    this.formdata.append('tutorName', this.data.tutorName);
    this.formdata.append('tutorSurname', this.data.tutorSurname);
    this.formdata.append('tutorCell', this.data.tutorCell);
    this.formdata.append('tutorAbout', this.data.tutorAbout);
    this.formdata.append('tutorPhoto', this.data.tutorPhoto); // dont know
    this.formdata.append('file', this.file);
    this.formdata.append('tutorEmail', this.data.tutorEmail);
    this.formdata.append('fileId', this.file.id); // dont know
    this.formdata.append('moduleId', this.moduleChosen.id);
    this.formdata.append('tutorStatusId', (3).toString()); //can this be hard coded
    Swal.fire({
      title: 'Are you sure you want to apply',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
       this.service.applyToBecomeTutor(this.formdata).subscribe(
        (result) => {
          this.data = result;
          Swal.fire('Application successful!', this.data.message, 'success');
          //this.router.navigate(['/loginhomepage/login']);
        },
        (error) => {
          Swal.fire('Error!', error.error, 'error');
        }
      );
      }
    });
  }
  // click() {
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'Application already exists. Please try again',
  //     confirmButtonText: 'Ok',
  //   });
  // }
}
