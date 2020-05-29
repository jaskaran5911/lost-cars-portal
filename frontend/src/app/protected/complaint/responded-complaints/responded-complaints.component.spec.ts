import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondedComplaintsComponent } from './responded-complaints.component';

describe('AcceptedComplaintsComponent', () => {
  let component: RespondedComplaintsComponent;
  let fixture: ComponentFixture<RespondedComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondedComplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondedComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
