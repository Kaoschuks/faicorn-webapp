import { TestBed, async, inject } from '@angular/core/testing';

import { AppGuards } from './app.guard';

describe('AppGuards', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppGuards]
    });
  });

  it('should ...', inject([AppGuards], (guard: AppGuards) => {
    expect(guard).toBeTruthy();
  }));
});
