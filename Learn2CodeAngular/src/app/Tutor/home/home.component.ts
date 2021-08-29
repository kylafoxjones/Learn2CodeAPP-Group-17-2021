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

  delete() {
    Swal.fire({
      title: 'Are you sure you want to change your password',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('', 'Password changed successfully', 'success');
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(MaintainTutorComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Unable to save changes',
      //   confirmButtonText: 'Ok',
      // });
    });
  }
}
