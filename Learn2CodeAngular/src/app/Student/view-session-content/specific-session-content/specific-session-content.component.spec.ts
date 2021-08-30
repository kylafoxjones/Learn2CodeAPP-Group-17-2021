import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificSessionContentComponent } from './specific-session-content.component';

describe('SpecificSessionContentComponent', () => {
  let component: SpecificSessionContentComponent;
  let fixture: ComponentFixture<SpecificSessionContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificSessionContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificSessionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
