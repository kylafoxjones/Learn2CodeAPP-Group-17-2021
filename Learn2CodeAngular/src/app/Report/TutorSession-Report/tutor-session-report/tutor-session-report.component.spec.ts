import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorSessionReportComponent } from './tutor-session-report.component';

describe('TutorSessionReportComponent', () => {
  let component: TutorSessionReportComponent;
  let fixture: ComponentFixture<TutorSessionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorSessionReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorSessionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
