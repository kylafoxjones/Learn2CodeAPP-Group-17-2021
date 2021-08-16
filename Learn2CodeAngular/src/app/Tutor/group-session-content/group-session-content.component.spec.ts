import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSessionContentComponent } from './group-session-content.component';

describe('GroupSessionContentComponent', () => {
  let component: GroupSessionContentComponent;
  let fixture: ComponentFixture<GroupSessionContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupSessionContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSessionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
