import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupSessionContentComponent } from './add-group-session-content.component';

describe('AddGroupSessionContentComponent', () => {
  let component: AddGroupSessionContentComponent;
  let fixture: ComponentFixture<AddGroupSessionContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGroupSessionContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupSessionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
