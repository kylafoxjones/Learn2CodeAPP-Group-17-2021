import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentRecievedMessagesComponent } from './sent-recieved-messages.component';

describe('SentRecievedMessagesComponent', () => {
  let component: SentRecievedMessagesComponent;
  let fixture: ComponentFixture<SentRecievedMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentRecievedMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentRecievedMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
