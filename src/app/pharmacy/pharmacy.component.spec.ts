import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyComponent } from './pharmacy.component';

describe('PharmacyComponent', () => {
  let component: PharmacyComponent;
  let fixture: ComponentFixture<PharmacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
