import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPagesComponent } from './index-pages.component';

describe('IndexPagesComponent', () => {
  let component: IndexPagesComponent;
  let fixture: ComponentFixture<IndexPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
