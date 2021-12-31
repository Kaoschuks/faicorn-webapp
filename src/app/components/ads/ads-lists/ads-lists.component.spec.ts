import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsListsComponent } from './ads-lists.component';

describe('AdsListsComponent', () => {
  let component: AdsListsComponent;
  let fixture: ComponentFixture<AdsListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdsListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
