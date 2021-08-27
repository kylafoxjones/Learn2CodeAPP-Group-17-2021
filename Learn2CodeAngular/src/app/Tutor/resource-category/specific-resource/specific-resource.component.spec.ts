import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificResourceComponent } from './specific-resource.component';

describe('SpecificResourceComponent', () => {
  let component: SpecificResourceComponent;
  let fixture: ComponentFixture<SpecificResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificResourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
