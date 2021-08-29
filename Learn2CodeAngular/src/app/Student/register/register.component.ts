import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StudentService } from '../Student resources/student.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  data: any = {};
  confirm: any = {};
  uniList: any = [];
  degreeList: any = [];
  moduleList: any = [];
  uniChosen: any;
  degreeChosen: any;
  moduleChosen: any;
  passwordsMatch = false;
  dtoToSendThrough: any = {};
  unixv: any;
  degreexv: any;
  modulexv: any;

  constructor(private service: StudentService, private router: Router) {}

  ngOnInit() {
    this.getAllUniversities();
  }

  getAllUniversities() {
    // all unis to then pick a degree
    this.service.getUnis().subscribe((res) => {
      this.uniList = res;
      console.log('the whole uni list', this.uniList);
    });
  }

  selectUni($event) {
    //get uni chosen as input from user in dropdown
    this.uniChosen = $event;
    console.log('uni chosen', this.uniChosen);
    this.getDegreesBasedOnUni(this.uniChosen);
  }

  getDegreesBasedOnUni(UniID) {
    // get degrees based on uni choice
    this.service.getUniDegrees(UniID).subscribe((res) => {
      this.degreeList = res;
      console.log('list of degrees based on uni chosen', this.degreeList);
    });
  }

  selectDegree($event) {
    //get uni chosen as input from user in dropdown
    this.degreeChosen = $event;
    console.log('degree chosen', this.degreeChosen);
    this.getModulesBasedOnDegree(this.degreeChosen);
  }

  getModulesBasedOnDegree(degreeID) {
    // get degrees based on uni choice
    this.service.getUniModules(degreeID).subscribe((res) => {
      this.moduleList = res;
      console.log('list of modules based on degree chosen', this.moduleList);
    });
  }

  selectModule($event) {
    //get module chosen as input from user in dropdown
    this.moduleChosen = $event;
    console.log('module chosen', this.moduleChosen);
  }

  tryRegister() {
    // sure you want to register
    Swal.fire({
      title: ' Are you sure you want to register',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      // if sure they want to reg
      if (result.isConfirmed) {
        console.log('input from user', this.data);
        // check passwords match
        this.checkPassword();
        // if they match
        if (this.passwordsMatch === true) {
          //create dto to send through
          this.dtoToSendThrough = {
            StudentName: this.data.name,
            StudentSurname: this.data.surname,
            StudentCell: this.data.cell,
            UserName: this.data.username,
            Email: this.data.email,
            Password: this.data.password,
            ModuleId: this.moduleChosen,
          };
          console.log('register dto sending to api', this.dtoToSendThrough);
          //send the new registration through
          this.trulyRegister();
        } else {
          // if passwords dont match
          console.log(this.passwordsMatch);
          //show error
          Swal.fire({
            icon: 'error',
            title: 'Try again',
            text: 'Your passwords do not match',
            confirmButtonText: 'Ok',
          });
        }
      }
    });
  }

  trulyRegister() {
    this.service.registerStudent(this.dtoToSendThrough).subscribe(
      (result) => {
        this.data = result;
        Swal.fire('Registration Complete!', this.data.message, 'success');
        this.router.navigate(['/loginhomepage/login']);
      },
      (error) => {
        Swal.fire('Error!', error.error, 'error');
      }
    );
  }

  checkPassword() {
    //let p = this.data.password;
    if (this.data.password === this.confirm.password) {
      this.passwordsMatch = true;
    } else {
      this.passwordsMatch = false;
    }
    console.log(this.passwordsMatch);
  }

  backToLogin() {
    this.router.navigate(['/loginhomepage/login']);
  }
}
