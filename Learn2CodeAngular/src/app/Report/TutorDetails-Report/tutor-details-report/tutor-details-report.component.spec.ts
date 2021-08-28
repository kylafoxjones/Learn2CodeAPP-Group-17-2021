import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDetailsReportComponent } from './tutor-details-report.component';

describe('TutorDetailsReportComponent', () => {
  let component: TutorDetailsReportComponent;
  let fixture: ComponentFixture<TutorDetailsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorDetailsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
