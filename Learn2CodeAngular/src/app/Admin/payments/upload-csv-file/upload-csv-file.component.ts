import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AdminService } from '../../admin resources/admin.service';

@Component({
  selector: 'app-upload-csv-file',
  templateUrl: './upload-csv-file.component.html',
  styleUrls: ['./upload-csv-file.component.scss'],
})
export class UploadCsvFileComponent implements OnInit {
  csvxv:any;
csv:any;
data:any;
  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<UploadCsvFileComponent>,
    private service: AdminService
  ) {}

  ngOnInit(): void {}

  content(event) {
   this.csv = event.target.files[0] 
  }

  upload() {
    let data = new FormData();
    data.append('file', this.csv);
    this.service.postfile(data).subscribe((res) => {
      this.data = res;
      console.log(res.message);
      this.dialogRef.close();
      Swal.fire('Success!','File uploaded','success').then((result) => {
        this.dialogRef.close();
        window.location.reload();
      });
      
    }, (error) => {
      Swal.fire('Error!','Something went wrong', 'error');
      this.dialogRef.close();
    }
    
    );
  }
}
