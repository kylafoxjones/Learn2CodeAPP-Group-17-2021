import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../admin resources/admin.service';

@Component({
  selector: 'app-upload-csv-file',
  templateUrl: './upload-csv-file.component.html',
  styleUrls: ['./upload-csv-file.component.scss'],
})
export class UploadCsvFileComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<UploadCsvFileComponent>,
    private service: AdminService
  ) {}

  ngOnInit(): void {}

  content(event) {
    let data = new FormData();
    data.append('file', event.target.files[0]);
    this.service.postfile(data).subscribe((res) => {
      console.log(res);
      this.dialogRef.close();
    },);
  }
}
