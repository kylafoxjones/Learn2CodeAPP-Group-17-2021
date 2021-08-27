import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditResourceCategoryComponent } from './add-edit-resource-category.component';

describe('AddEditResourceCategoryComponent', () => {
  let component: AddEditResourceCategoryComponent;
  let fixture: ComponentFixture<AddEditResourceCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditResourceCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditResourceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
