import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AdminService } from '../admin resources/admin.service';
import { UploadCsvFileComponent } from './upload-csv-file/upload-csv-file.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {

  //pagination
  totalLength:any;
  page:number = 1;

  payments: any;
  search;
  constructor(public dialog: MatDialog, private service: AdminService, private router: Router) {}

  ngOnInit() {
   this.getPaymentList();
  }

  getPaymentList(){
    this.service.getPayments().subscribe((result) => {
      this.payments = result;
      this.totalLength = this.payments.length;
    });
  }


  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };

  openPopUpUpload(): void {
    const dialogRef = this.dialog.open(UploadCsvFileComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {

    
      this.getPaymentList();
    });
  }
}
