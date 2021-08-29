import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../Student resources/student.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-maintain-student',
  templateUrl: './maintain-student.component.html',
  styleUrls: ['./maintain-student.component.scss'],
})
export class MaintainStudentComponent implements OnInit {
  placeholder = this.StudentService.editStud;
  data: any = {};
  uniList: any = [];
  degreeList: any = [];
  moduleList: any = [];
  uniChosen: any;
  degreeChosen: any;
  moduleChosen: any;
  unixv: any;
  degreexv: any;
  modulexv: any;

  constructor(
    private StudentService: StudentService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<MaintainStudentComponent>
  ) {}

  ngOnInit(): void {
    this.data.StudentName = this.placeholder.studentName;
    this.data.StudentSurname = this.placeholder.studentSurname;
    this.data.Email = this.placeholder.identity.email;
    this.data.StudentCell = this.placeholder.studentCell;
    this.data.UserName = this.placeholder.identity.userName;
    this.StudentService.userId = this.placeholder.identity.id;
    console.log('user id', this.placeholder.identity.id);
    this.getAllUniversities();
  }

  onSubmit() {
    console.log(this.StudentService.editStud);
    //  if (this.StudentService.editId > 0) {
    Swal.fire({
      title: 'Are you sure you want to edit your information?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.StudentService.editStudent(this.data).subscribe((result) => {
          this.data = result;
          console.log('data going to api', this.data);
          this.dialogRef.close();
          Swal.fire('Update successful!', this.data.message, 'success');
        });
        //  location.reload();
      }
      // location.reload();
    });
  }

  // }

  getAllUniversities() {
    // all unis to then pick a degree
    this.StudentService.getUnis().subscribe((res) => {
      this.uniList = res;
      console.log('the whole uni list', this.uniList);
    });
  }

  selectUni($event) {
    //get uni chosen as input from user in dropdown
    this.uniChosen = $event;
    console.log('uni chosen', this.uniChosen);
    this.getDegreesBasedOnUni(this.uniChosen);
  }

  // selectType($event) {
  //   console.log('this is the event', $event);
  //   this.data.UniversityName = $event; //what is selected in the dropdown is sent back in this parameter to the api
  //   console.log(this.data.UniversityName);
  //  // this.StudentService.TutorSessionIdFromDropdown = this.data.TutorSessionId;
  //  this.getDegreesBasedOnUni(this.uniChosen);
  // }

  getDegreesBasedOnUni(UniID) {
    // get degrees based on uni choice
    this.StudentService.getUniDegrees(UniID).subscribe((res) => {
      this.degreeList = res;
      console.log('list of degrees based on uni chosen', this.degreeList);
    });
  }
  selectDegree($event) {
    //get uni chosen as input from user in dropdown
    this.degreeChosen = $event;
    console.log('degree chosen', this.degreeChosen);
    this.getModulesBasedOnDegree(this.degreeChosen);
  }

  getModulesBasedOnDegree(degreeID) {
    // get degrees based on uni choice
    this.StudentService.getUniModules(degreeID).subscribe((res) => {
      this.moduleList = res;
      console.log('list of modules based on degree chosen', this.moduleList);
    });
  }

  selectModule($event) {
    //get module chosen as input from user in dropdown
    this.moduleChosen = $event;
    console.log('module chosen', this.moduleChosen);
    this.StudentService.moduleId = this.moduleChosen;
  }
}
