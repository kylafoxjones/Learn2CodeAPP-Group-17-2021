import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from '../admin resources/admin.service';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  //pagination
  totalLength:any;
  page:number = 1;

  //declare variables
  studentList: any = [];
  student: any;
  search;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: AdminService
  ) { }

  ngOnInit(){
    this.getAllStudents();
  }

  delete(id:string) {
    Swal.fire({
      title: 'Are you sure you want to delete the Student?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteStudent(id).subscribe((result) => {
          this.getAllStudents();
          Swal.fire('Successful Deletion', '', 'success');
        },(error) => {

          Swal.fire('Error!', error.error, 'error');
      });
        
      }
      });
  }
  getAllStudents() {
    this.service.getStudents().subscribe((result) => {
      this.studentList = result;
      this.totalLength = this.studentList.length;
      console.log(this.studentList);
    });
  }

  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };
}
