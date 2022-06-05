import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DrugSService } from 'src/app/service/drug-s.service';
import {HttpClientModule} from '@angular/common/http';

import { DrugsComponent } from './drugs.component';

describe('DrugsComponent', () => {
  let component: DrugsComponent;
  let fixture: ComponentFixture<DrugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugsComponent ],
      imports: [FormsModule,HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


it('drugsCost is not valid', () => {
  fixture.whenStable().then(() => {
    let drugsCost = component.ngForm.controls['drugsCost'];
    expect(drugsCost.valid).toBeFalsy();
    drugsCost.setValue(500);
  });

  fixture.detectChanges();
  fixture.whenStable().then(() => {
    const drugsCostErrors:HTMLDivElement = fixture.debugElement.nativeElement.querySelector('#drugsCostErrors');
    expect(drugsCostErrors.children.length).toEqual(1);
    expect(drugsCostErrors.children[0].innerHTML).toEqual('Drugs Cost is required');
  });
})





});
