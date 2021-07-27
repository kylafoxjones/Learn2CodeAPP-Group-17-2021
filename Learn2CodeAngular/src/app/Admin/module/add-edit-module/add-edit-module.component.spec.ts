import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditModuleComponent } from './add-edit-module.component';

describe('AddEditModuleComponent', () => {
  let component: AddEditModuleComponent;
  let fixture: ComponentFixture<AddEditModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
