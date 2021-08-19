import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  delete() {
    Swal.fire({
      title: ' Are you sure you want to register',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'error',
          title: 'Unable to Register',
          confirmButtonText: 'Ok',
        });
      }
    });
  }

  click() {
    Swal.fire({
      icon: 'success',
      title: '',
      text: 'Registration successful',
      confirmButtonText: 'Ok',
    });
  }
}
