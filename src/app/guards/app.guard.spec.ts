import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuardsService } from './app.guard';

describe('AuthGuardsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardsService]
    });
  });

  it('should ...', inject([AuthGuardsService], (guard: AuthGuardsService) => {
    expect(guard).toBeTruthy();
  }));
});
