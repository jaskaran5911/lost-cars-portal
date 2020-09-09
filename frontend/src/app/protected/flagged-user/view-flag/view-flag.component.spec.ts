import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFlagComponent } from './view-flag.component';

describe('ViewFlagComponent', () => {
  let component: ViewFlagComponent;
  let fixture: ComponentFixture<ViewFlagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFlagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
