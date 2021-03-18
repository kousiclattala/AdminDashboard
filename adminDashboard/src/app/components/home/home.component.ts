import { Component, OnInit } from '@angular/core';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  select = 0;
  onGoingTrips: Object;

  constructor(private trip: TripsService) {}

  ngOnInit(): void {
    this.trip.getOngoingTrips().subscribe((trip: Object) => {
      this.onGoingTrips = trip;
    });
  }

  pageSelected(n) {
    this.select = n;
  }
}
