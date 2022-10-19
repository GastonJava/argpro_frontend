import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragndroptestingComponent } from './dragndroptesting.component';

describe('DragndroptestingComponent', () => {
  let component: DragndroptestingComponent;
  let fixture: ComponentFixture<DragndroptestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragndroptestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragndroptestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
