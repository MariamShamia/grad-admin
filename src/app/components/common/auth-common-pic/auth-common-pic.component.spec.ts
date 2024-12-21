import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCommonPicComponent } from './auth-common-pic.component';

describe('AuthCommonPicComponent', () => {
  let component: AuthCommonPicComponent;
  let fixture: ComponentFixture<AuthCommonPicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthCommonPicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthCommonPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
