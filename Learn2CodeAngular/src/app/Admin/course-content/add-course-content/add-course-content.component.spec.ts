import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseContentComponent } from './add-course-content.component';

describe('AddCourseContentComponent', () => {
  let component: AddCourseContentComponent;
  let fixture: ComponentFixture<AddCourseContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCourseContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
