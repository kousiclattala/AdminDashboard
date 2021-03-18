import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnGoingTripsComponent } from './on-going-trips.component';

describe('OnGoingTripsComponent', () => {
  let component: OnGoingTripsComponent;
  let fixture: ComponentFixture<OnGoingTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnGoingTripsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnGoingTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
