import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUniversityComponent } from './add-edit-university/add-edit-university.component';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss'],
})
export class UniversityComponent implements OnInit {
  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {}

  delete() {
    Swal.fire({
      title: 'Are you sure you want to delete the University?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Successful Deletion', '', 'success');
      }
    });
  }
  
    
   
    openDialog() {
      const dialogRef = this.dialog.open(AddEditUniversityComponent, {
        width: '350px',
        
      });

      dialogRef.afterClosed().subscribe(result => {
        
      });
    }
    
  }


