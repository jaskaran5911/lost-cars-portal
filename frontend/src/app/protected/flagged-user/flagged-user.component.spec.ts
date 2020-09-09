import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlaggedUserComponent } from './flagged-user.component';

describe('FlaggedUserComponent', () => {
  let component: FlaggedUserComponent;
  let fixture: ComponentFixture<FlaggedUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlaggedUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlaggedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
