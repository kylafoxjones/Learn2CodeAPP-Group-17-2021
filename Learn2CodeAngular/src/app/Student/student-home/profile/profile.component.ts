import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../Student resources/student.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MaintainStudentComponent } from '../maintain-student/maintain-student.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
//thissStudent =this.StudentService.getStudentInfo();
//console.log(this.thissStudent);
thissStudent:any;
userId:any;
id:any;
  constructor(private StudentService: StudentService, public dialog: MatDialog) { }

  ngOnInit() {
//this.StudentService.getStudentInfo();
//this.thissStudent=this.StudentService.getStudentInfo();
 // console.log(this.thissStudent);

this.getStudentInfo();

  }



  getStudentInfo() { //to get the student info for the circle at the top
    this.userId = localStorage.getItem('id');
    console.log(this.userId);
     this.StudentService.getStudent(this.userId).subscribe((result) => {
       this.thissStudent = result;
       console.log('student info on profile component', this.thissStudent);

     });
 // return this.thissStudent;
  
    }
    openEditDialog(){
      this.StudentService.edit = true;
      this.StudentService.editStud = this.thissStudent;
     // this.service.oldContName = obj.moduleCode;
    // this.StudentService.students = this.StudentService.contentList;
      this.StudentService.editId = this.thissStudent.id;
      console.log("edit id id:" , this.StudentService.editId);
      this.StudentService.title = 'Edit session content';
      console.log(this.StudentService.title);
      const dialogRef = this.dialog.open(MaintainStudentComponent, {
        width: '700px',
      });
      dialogRef.afterClosed().subscribe((result) => {
       // location.reload();
      });
    }
}
