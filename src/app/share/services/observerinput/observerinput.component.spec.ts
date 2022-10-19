/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ObserverinputComponent } from './observerinput.component';

describe('ObserverinputComponent', () => {
  let component: ObserverinputComponent;
  let fixture: ComponentFixture<ObserverinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObserverinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObserverinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
