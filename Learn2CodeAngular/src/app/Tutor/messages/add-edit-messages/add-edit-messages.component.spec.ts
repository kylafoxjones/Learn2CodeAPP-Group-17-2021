import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMessagesComponent } from './add-edit-messages.component';

describe('AddEditMessagesComponent', () => {
  let component: AddEditMessagesComponent;
  let fixture: ComponentFixture<AddEditMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
