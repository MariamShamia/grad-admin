import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddroutineComponent } from './add-routine.component';

describe('AddroutineComponent', () => {
  let component: AddroutineComponent;
  let fixture: ComponentFixture<AddroutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddroutineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddroutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
