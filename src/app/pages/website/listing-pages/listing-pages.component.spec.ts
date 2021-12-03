import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingPagesComponent } from './listing-pages.component';

describe('ListingPagesComponent', () => {
  let component: ListingPagesComponent;
  let fixture: ComponentFixture<ListingPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
