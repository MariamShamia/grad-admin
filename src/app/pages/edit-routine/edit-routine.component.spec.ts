import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditroutineComponent } from './edit-routine.component';

describe('EditroutineComponent', () => {
  let component: EditroutineComponent;
  let fixture: ComponentFixture<EditroutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditroutineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditroutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
