import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsSidebarComponent } from './accounts-sidebar.component';

describe('AccountsSidebarComponent', () => {
  let component: AccountsSidebarComponent;
  let fixture: ComponentFixture<AccountsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
