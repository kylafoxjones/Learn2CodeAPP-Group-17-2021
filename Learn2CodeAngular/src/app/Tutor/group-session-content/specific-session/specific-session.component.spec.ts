import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificSessionComponent } from './specific-session.component';

describe('SpecificSessionComponent', () => {
  let component: SpecificSessionComponent;
  let fixture: ComponentFixture<SpecificSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
