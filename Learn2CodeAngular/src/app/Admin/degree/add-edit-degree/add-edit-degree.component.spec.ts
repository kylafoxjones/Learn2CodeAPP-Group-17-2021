import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDegreeComponent } from './add-edit-degree.component';

describe('AddEditDegreeComponent', () => {
  let component: AddEditDegreeComponent;
  let fixture: ComponentFixture<AddEditDegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDegreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
