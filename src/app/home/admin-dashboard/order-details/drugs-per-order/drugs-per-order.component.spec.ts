import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsPerOrderComponent } from './drugs-per-order.component';

describe('DrugsPerOrderComponent', () => {
  let component: DrugsPerOrderComponent;
  let fixture: ComponentFixture<DrugsPerOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugsPerOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsPerOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
