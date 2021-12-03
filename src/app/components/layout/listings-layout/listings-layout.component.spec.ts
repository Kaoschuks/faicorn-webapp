import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingsLayoutComponent } from './listings-layout.component';

describe('ListingsLayoutComponent', () => {
  let component: ListingsLayoutComponent;
  let fixture: ComponentFixture<ListingsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingsLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
