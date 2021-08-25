import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainTutorComponent } from './maintain-tutor.component';

describe('MaintainTutorComponent', () => {
  let component: MaintainTutorComponent;
  let fixture: ComponentFixture<MaintainTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintainTutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
