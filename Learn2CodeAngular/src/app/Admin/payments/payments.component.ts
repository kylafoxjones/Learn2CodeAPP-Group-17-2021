import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AdminService } from '../admin resources/admin.service';
import { UploadCsvFileComponent } from './upload-csv-file/upload-csv-file.component';
import { NgxPaginationModule } from 'ngx-pagination';

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
  constructor(public dialog: MatDialog, private service: AdminService) {}

  ngOnInit() {
   this.getPaymentList();
  }

  getPaymentList(){
    this.service.getPayments().subscribe((result) => {
      this.payments = result;
      this.totalLength = this.payments.length;
    });
  }

  openPopUpUpload(): void {
    const dialogRef = this.dialog.open(UploadCsvFileComponent, {
      width: '350px',
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'file is uploaded',
    //     confirmButtonText: 'Ok',
    //   });
    // });
  }
}
