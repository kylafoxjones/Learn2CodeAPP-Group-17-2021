import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddEditDegreeComponent } from './add-edit-degree/add-edit-degree.component';
import Swal from 'sweetalert2';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.scss']
})
export class DegreeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  delete(){
    Swal.fire({
      title: 'Degree Exists',
      text: "Degree already exists. Please try again",
      icon: 'error',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Okay'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Degree has been deleted.',
          'success'
        )
      }
    })
  }

  edit()
  {
    Swal.fire({
      title: 'Are you sure you want to create the Degree?',
      
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Saved!',
          'Degree has been updated.',
          'success'
        )
      }
    })
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(AddEditDegreeComponent, {
      width: '350px',
      
    });
  
    dialogRef.afterClosed().subscribe(result => {
      Swal.fire({
      
        icon: 'success',
        title: 'Degree has been created',
        confirmButtonText: 'Ok',
        
      })
      
    });
  }
  
  search(){
    Swal.fire({
      
      icon: 'warning',
      title: 'No matches Found',
      confirmButtonText: 'Ok',
      
    })
  }
}
