import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainStudentComponent } from './maintain-student.component';

describe('MaintainStudentComponent', () => {
  let component: MaintainStudentComponent;
  let fixture: ComponentFixture<MaintainStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintainStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
