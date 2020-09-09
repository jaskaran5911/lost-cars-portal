import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFlagComponent } from './create-flag.component';

describe('CreateFlagComponent', () => {
  let component: CreateFlagComponent;
  let fixture: ComponentFixture<CreateFlagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFlagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
