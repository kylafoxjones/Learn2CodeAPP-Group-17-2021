import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUniversityComponent } from './add-edit-university.component';

describe('AddEditUniversityComponent', () => {
  let component: AddEditUniversityComponent;
  let fixture: ComponentFixture<AddEditUniversityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditUniversityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditUniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
