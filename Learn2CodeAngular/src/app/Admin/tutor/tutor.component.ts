import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from '../admin resources/admin.service';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.scss']
})
export class TutorComponent implements OnInit {
  //pagination
  page1:number = 1;
  totalLength1:any;
 //declare variables
 tutorList: any = [];
 tutor: any;
 search;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: AdminService
  ) { }

  ngOnInit(){
    this.getAllTutors();
  }
  delete(id:string) {
    Swal.fire({
      title: 'Are you sure you want to delete the Tutor?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteTutor(id).subscribe((result) => {
          this.getAllTutors();
          Swal.fire('Successful Deletion', '', 'success');
        },(error) => {
          Swal.fire('Error!', error.error, 'error');
        });
       
      }
    });
  }
  getAllTutors() {
    this.service.getTutors().subscribe((result) => {
      this.tutorList = result;
      this.totalLength1 = this.tutorList.length;
      console.log(this.tutorList);
    });
  }

  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };
}
