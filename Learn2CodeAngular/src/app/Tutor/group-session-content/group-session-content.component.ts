import { Component, OnInit } from '@angular/core';
import { AddGroupSessionContentComponent } from './add-group-session-content/add-group-session-content.component';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { TutorService } from '../tutor resources/tutor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-session-content',
  templateUrl: './group-session-content.component.html',
  styleUrls: ['./group-session-content.component.scss']
})
export class GroupSessionContentComponent implements OnInit {
  search;
  content: any;
  contentList: any;
  constructor(public dialog: MatDialog, private service: TutorService,   private router: Router) { }

  ngOnInit(): void {
    this.getAllSessionContent();
  }

  getAllSessionContent(){
    //logged in tutor is hardcoded for now
    this.service.getAllTutorSessions(7).subscribe((result) => {
      this.contentList = result;
      console.log('list of sessions for a specific tutor', this.contentList);
    });
  }

    
  navigateToSpecificSession(id:number){
    this.service.bookingIdToSend=id;
    this.router.navigateByUrl('/specificsession');
  }
}
