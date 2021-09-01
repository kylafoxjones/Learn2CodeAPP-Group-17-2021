import { TestBed } from '@angular/core/testing';

import { TutorGuard } from './tutor.guard';

describe('TutorGuard', () => {
  let guard: TutorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TutorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
