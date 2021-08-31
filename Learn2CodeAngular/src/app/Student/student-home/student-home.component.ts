import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/Login/login.service';
import { MatMenuModule } from '@angular/material/menu';
import { StudentService } from '../Student resources/student.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss'],
})
export class StudentHomeComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  userId: any;
  id: any;
  courses: any = [];
  hasCourse: any = false;
  thisStudent: any;

  //   userId:any;
  //   id:any;
  //   courses:any=[];
  //   hasCourse:any=false;
  // thisStudent:any;
  // courseContentCat:any={};

  courseSubCatID: any;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: Router,
    public dialog: MatDialog,
    private _route: ActivatedRoute,
    private service: LoginService,
    private StudentService: StudentService
  ) {}

  ngOnInit() {
    this.getStudentt();
    //  this.courseContentCat=this.StudentService.course;
  }

  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.route.navigate(['/loginhomepage/login']);
  };

  getStudentt() {
    this.userId = localStorage.getItem('id');
    console.log(this.userId);
    this.StudentService.getStudent(this.userId).subscribe((result) => {
      this.thisStudent = result;
      // console.log('student info', this.StudentService.student);
      //  this.thisStudent=this.StudentService.student;
      //console.log(this.StudentService.student);
      console.log(this.thisStudent);
      this.id = this.thisStudent.id;
      console.log(this.id);

      this.StudentService.getStudentCourses(this.id).subscribe((result) => {
        this.courses = result;
        console.log('student courses', this.courses);
        //console.log("test ",this.courses[0].courseFolderLine[0].courseSubCategory.description);

        if (this.courses.length == 0) {
          this.hasCourse = false;
        } else {
          this.hasCourse = true;
        }
        console.log('has Course ', this.hasCourse);
      });
    });
  }

  profile() {
    this.route.navigate(['/profile']);
  }
}
// specificCourse(obj){
//   console.log("course is", obj);
//  this.StudentService.courseObj=obj;
//  this.courseSubCatID=obj.courseEnrolLine[0].courseSubCategoryId;
//  console.log("service course", this.StudentService.courseObj);
//   this.route.navigate(['/specificcoursedisplay']);
// }
