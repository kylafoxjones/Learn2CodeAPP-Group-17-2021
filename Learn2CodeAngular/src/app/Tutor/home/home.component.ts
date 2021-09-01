import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ChartType, ChartOptions } from 'chart.js';
import Swal from 'sweetalert2';
import * as Chart from 'chart.js';
import { title } from 'process';
// import { MaintainComponent } from '../maintain/maintain.component';
import { TutorService } from '../tutor resources/tutor.service';
import { MaintainTutorComponent } from './maintain-tutor/maintain-tutor.component';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tutor: any;
  userId: any;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private TutorService: TutorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getLoggedinInfo();
  }

  getLoggedinInfo() {
    this.userId = localStorage.getItem('id');
    console.log(this.userId);
    this.TutorService.getTutor(this.userId).subscribe((result) => {
      this.tutor = result;
      this.TutorService.tutorToEdit = this.tutor;
      console.log('tutor info', this.tutor);
    });
  }

  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };

  delete(id) {
    Swal.fire({
      title: 'Are you sure you want to delete your profile?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.TutorService.deletetutor(id).subscribe((result) => {
        
          Swal.fire('Successful Deletion', '', 'success').then(function(){localStorage.removeItem('token');
          localStorage.removeItem('id');
          this.router.navigate(['/loginhomepage/login']);});
        },(error) => {
          
          Swal.fire('Error!', error.error, 'error');
        });
        
      }
    });
  }

  


  openDialog() {
    const dialogRef = this.dialog.open(MaintainTutorComponent, {
      width: '650px',
      height: '550px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getLoggedinInfo();
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Unable to save changes',
      //   confirmButtonText: 'Ok',
      // });
    });
  }

  changePassword() {
    Swal.fire({
      title: 'Are you sure you want to change your password?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        const dialogRef = this.dialog.open(ChangePasswordComponent, {
          width: '500px',
        });
        dialogRef.afterClosed().subscribe((result) => {
          this.getLoggedinInfo();
        });
      }
    });
  }
}
