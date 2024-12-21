import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboradComponent } from './dasborad.component';

describe('DasboradComponent', () => {
  let component: DasboradComponent;
  let fixture: ComponentFixture<DasboradComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DasboradComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DasboradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
