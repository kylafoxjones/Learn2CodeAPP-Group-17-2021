import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainSessionComponent } from './maintain-session.component';

describe('MaintainSessionComponent', () => {
  let component: MaintainSessionComponent;
  let fixture: ComponentFixture<MaintainSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintainSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
