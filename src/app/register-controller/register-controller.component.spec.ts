import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterControllerComponent } from './register-controller.component';

describe('RegisterControllerComponent', () => {
  let component: RegisterControllerComponent;
  let fixture: ComponentFixture<RegisterControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
