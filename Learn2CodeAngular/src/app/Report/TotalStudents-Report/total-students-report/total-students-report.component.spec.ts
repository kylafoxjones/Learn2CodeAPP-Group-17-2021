import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalStudentsReportComponent } from './total-students-report.component';

describe('TotalStudentsReportComponent', () => {
  let component: TotalStudentsReportComponent;
  let fixture: ComponentFixture<TotalStudentsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalStudentsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalStudentsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
