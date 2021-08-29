import { getLocalePluralCase } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../Student resources/student.service';
import { saveAs } from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-display-courses',
  templateUrl: './display-courses.component.html',
  styleUrls: ['./display-courses.component.scss']
})
export class DisplayCoursesComponent implements OnInit {
  //this.courseSubCategoryname=this.StudentService.courseSubCatName;
  //console.log("subcat name in display", this.courseSubCategoryname);
  thissStudent:any;
  userId:any;
  id:any;
  courses:any=[];
  prev_url:any;
  showVid:any=false;
  course:any=[];
  courseContentCat=this.StudentService.courseObj;
noteList:any=[];
videoList:any=[];
hasNotes:any=false;
search;
hasVid:any=false;

  constructor(private StudentService: StudentService,  private router: Router,private sanitizer: DomSanitizer, private route: ActivatedRoute) { }

  ngOnInit(){
  
this.getStudentInfo();

const CourseSubID = this.route.snapshot.paramMap.get('subCategoryId');
console.log(CourseSubID);
if (CourseSubID){
  this.StudentService.getCourseById(CourseSubID).subscribe((result) => {
    this.course = result;
  console.log(this.course);
  this.splitList();
})
   }

  }


  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };

  splitList(){
for (let i=0;this.course.length;i++){
  if(this.course[i].contentType.contentTypeName == "Notes"){
    this.noteList.push(this.course[i]);
    console.log("notes list", this.noteList);
//     if(this.hasNotes.length!=0){
//       this.hasNotes=true;
//     }
//     else {
//       this.hasNotes=false;
//     }
    
// console.log("notes", this.hasNotes);
 }
  else {
    this.videoList.push(this.course[i]);
    console.log("video list", this.videoList);
  //   if(this.hasVid.length!=0){
  //     this.hasVid=true;
  //   }
  //   else {
  //     this.hasVid=false;
  //   }
  //   console.log("vid", this.hasVid);
  }
}

  }
   
  

  getStudentInfo() { //to get the student info for the circle at the top
    this.userId = localStorage.getItem('id');
    console.log(this.userId);
     this.StudentService.getStudent(this.userId).subscribe((result) => {
       this.thissStudent = result;
       console.log('student info on profile component', this.thissStudent);
       console.log("subcat name in display", this.courseContentCat);
    
  });
  }



  DownloadPDF(obj) {
    console.log(obj);
     this.StudentService.getCourseContentFileDisplay(obj.id).subscribe((blob) => {
       console.log("this is blob: ",blob);
     saveAs(blob, obj.fileName);
    });   
  
  }

  WatchVid(obj){
    this.showVid=true;
    this.StudentService.getCourseContentVideoDisplay(obj.id).subscribe((res) => {
      console.log(res);
      var URL = window.URL;
      this.prev_url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res));
    });
  }
}





