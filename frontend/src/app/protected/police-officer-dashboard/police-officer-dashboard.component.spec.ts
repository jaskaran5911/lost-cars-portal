import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceOfficerDashboardComponent } from './police-officer-dashboard.component';

describe('PoliceOfficerDashboardComponent', () => {
  let component: PoliceOfficerDashboardComponent;
  let fixture: ComponentFixture<PoliceOfficerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliceOfficerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliceOfficerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
