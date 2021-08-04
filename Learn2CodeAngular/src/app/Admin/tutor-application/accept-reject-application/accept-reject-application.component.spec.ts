import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptRejectApplicationComponent } from './accept-reject-application.component';

describe('AcceptRejectApplicationComponent', () => {
  let component: AcceptRejectApplicationComponent;
  let fixture: ComponentFixture<AcceptRejectApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptRejectApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptRejectApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
