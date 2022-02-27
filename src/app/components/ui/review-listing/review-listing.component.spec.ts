import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewListingComponent } from './review-listing.component';

describe('ReviewListingComponent', () => {
  let component: ReviewListingComponent;
  let fixture: ComponentFixture<ReviewListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
