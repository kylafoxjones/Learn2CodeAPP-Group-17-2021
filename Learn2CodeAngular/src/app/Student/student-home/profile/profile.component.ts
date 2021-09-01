import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../Student resources/student.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MaintainStudentComponent } from '../maintain-student/maintain-student.component';
import { Router } from '@angular/router';
import { ChangeStudentPasswordComponent } from '../change-student-password/change-student-password.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  //thissStudent =this.StudentService.getStudentInfo();
  //console.log(this.thissStudent);
  thissStudent: any;
  userId: any;
  id: any;
  constructor(
    private StudentService: StudentService,
    public dialog: MatDialog,
    private route: Router
  ) {}

  ngOnInit() {
    //this.StudentService.getStudentInfo();
    //this.thissStudent=this.StudentService.getStudentInfo();
    // console.log(this.thissStudent);

    this.getStudentInfo();
  }
  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.route.navigate(['/loginhomepage/login']);
  };
  getStudentInfo() {
    //to get the student info for the circle at the top
    this.userId = localStorage.getItem('id');
    console.log(this.userId);
    this.StudentService.getStudent(this.userId).subscribe((result) => {
      this.thissStudent = result;
      console.log('student info on profile component', this.thissStudent);
    });
    // return this.thissStudent;
  }
  openEditDialog() {
    this.StudentService.edit = true;
    this.StudentService.editStud = this.thissStudent;
    // this.service.oldContName = obj.moduleCode;
    // this.StudentService.students = this.StudentService.contentList;
    this.StudentService.editId = this.thissStudent.id;
    console.log('edit id id:', this.StudentService.editId);
    this.StudentService.title = 'Edit session content';
    console.log(this.StudentService.title);
    const dialogRef = this.dialog.open(MaintainStudentComponent, {
      width: '700px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getStudentInfo();
    });
  }

  onDelete(Id: number) {
    Swal.fire({
      title: 'Are you sure you want to delete your information?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.StudentService.deleteStudInfo(Id).subscribe((result) => {
          Swal.fire('Successful Deletion', '', 'success').then(function(){localStorage.removeItem('token');
          localStorage.removeItem('id');
          this.router.navigate(['/loginhomepage/login']);});
        },(error) => {
          
          Swal.fire('Error!', error.error, 'error');
        });
        
      }
    });
  }
  changePassword(){
    Swal.fire({
      title:
        'Are you sure you want to chnage your password?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        const dialogRef = this.dialog.open(ChangeStudentPasswordComponent, {
          width: '500px',
        });
        dialogRef.afterClosed().subscribe((result) => {
          this.getStudentInfo();
        });
      }
    });
}
}
