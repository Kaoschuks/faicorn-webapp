import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepasswordFormComponent } from './changepassword-form.component';

describe('ChangepasswordFormComponent', () => {
  let component: ChangepasswordFormComponent;
  let fixture: ComponentFixture<ChangepasswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangepasswordFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
