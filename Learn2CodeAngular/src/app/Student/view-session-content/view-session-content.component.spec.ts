import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSessionContentComponent } from './view-session-content.component';

describe('ViewSessionContentComponent', () => {
  let component: ViewSessionContentComponent;
  let fixture: ComponentFixture<ViewSessionContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSessionContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSessionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
