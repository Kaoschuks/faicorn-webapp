import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsCategoryScrollComponent } from './ads-category-scroll.component';

describe('AdsCategoryScrollComponent', () => {
  let component: AdsCategoryScrollComponent;
  let fixture: ComponentFixture<AdsCategoryScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdsCategoryScrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsCategoryScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
