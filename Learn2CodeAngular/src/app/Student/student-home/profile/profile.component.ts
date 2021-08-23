import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../Student resources/student.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
thissStudent =this.StudentService.getStudentInfo();;

  constructor(private StudentService: StudentService) { }

  ngOnInit() {
//this.StudentService.getStudentInfo();
//this.thissStudent=this.StudentService.getStudentInfo();
  console.log(this.thissStudent);



  }



}
