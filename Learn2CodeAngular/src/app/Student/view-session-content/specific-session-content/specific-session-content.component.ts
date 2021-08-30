import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from '../../Student resources/student.service';

import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-specific-session-content',
  templateUrl: './specific-session-content.component.html',
  styleUrls: ['./specific-session-content.component.scss']
})
export class SpecificSessionContentComponent implements OnInit {
  //contentType:any;
 // sessioncat = this.service.sessionContentCat;
  title = this.service.SessionTitle;
  content: any;
  categoryList: any = [];
  data: any;
  category: any;

  prev_url: any;
  hasContent:any=false;;
  showVid: any = false;
userId:any;
thissStudent:any;
  constructor(
    public dialog: MatDialog,
    private service: StudentService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.getSessionContent();
    this.getStudentInfo();
  }
  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };
  getStudentInfo() {
    //to get the student info for the circle at the top
    this.userId = localStorage.getItem('id');
    console.log(this.userId);
    this.service.getStudent(this.userId).subscribe((result) => {
      this.thissStudent = result;
      console.log('student info on view session content component', this.thissStudent);
    });
  }
  getSessionContent() {
    console.log('the bookinginstance id ', this.service.bookingInstanceID);
    this.service
      .getContentForSelectedSessions(this.service.bookingInstanceID)
      .subscribe((result) => {
        this.content = result;
        console.log('content for session that was chosen', this.content);

        if (this.content != {} )
        {
          this.hasContent=true;
        }
        else {
          this.hasContent=false;
        }
       // this.getCategory();
      });
  }
       

  // getCategory() {
  //   this.service.getSessionContentType().subscribe((result) => {
  //     this.categoryList = result;
  //     console.log('Category list', this.categoryList);
  //     this.category = this.categoryList.find((obj) => {
  //       return obj.id === this.content[0].sessionContentCategoryId;
  //     });
  //     console.log('category for content ', this.category);
  //     if (this.category != {}) {
  //       this.hasContentTs = true;
  //     }
  //     console.log('has Content ', this.hasContentTs);
  //   });
  // }

  video() {
    this.showVid = true;
    this.service.getContentVideoDisplay(this.content.id).subscribe((res) => {
      console.log(res);
      var URL = window.URL;
      this.prev_url = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(res)
      );
    });
  }

  DownloadPDF() {
    console.log('content id is: ', this.content.id);
    let vidId = this.content.id;
    this.service.downloadContentFile(vidId).subscribe((blob) => {
      console.log('this is blob: ', blob);
      saveAs(blob, this.content.notesName);
    });
  }
}
