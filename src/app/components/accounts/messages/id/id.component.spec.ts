import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesIdComponent } from './id.component';

describe('MessagesIdComponent', () => {
  let component: MessagesIdComponent;
  let fixture: ComponentFixture<MessagesIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessagesIdComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
