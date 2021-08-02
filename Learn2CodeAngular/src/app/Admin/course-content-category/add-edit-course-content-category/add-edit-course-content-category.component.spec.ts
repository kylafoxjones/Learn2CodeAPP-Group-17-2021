import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCourseContentCategoryComponent } from './add-edit-course-content-category.component';

describe('AddEditCourseContentCategoryComponent', () => {
  let component: AddEditCourseContentCategoryComponent;
  let fixture: ComponentFixture<AddEditCourseContentCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCourseContentCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCourseContentCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
