import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseContentCategoryComponent } from './course-content-category.component';

describe('CourseContentCategoryComponent', () => {
  let component: CourseContentCategoryComponent;
  let fixture: ComponentFixture<CourseContentCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseContentCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseContentCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
