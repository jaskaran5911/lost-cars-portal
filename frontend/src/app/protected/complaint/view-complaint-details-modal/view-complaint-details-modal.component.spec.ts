import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComplaintDetailsModalComponent } from './view-complaint-details-modal.component';

describe('ViewComplaintDetailsModalComponent', () => {
  let component: ViewComplaintDetailsModalComponent;
  let fixture: ComponentFixture<ViewComplaintDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewComplaintDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComplaintDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
