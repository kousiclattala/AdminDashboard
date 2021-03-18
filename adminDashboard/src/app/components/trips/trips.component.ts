import { Component, OnChanges, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AgentsService } from 'src/app/services/agents.service';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
})
export class TripsComponent implements OnInit, OnChanges {
  onGoingTrips: Object;

  allAgents: Object;

  constructor(
    private trip: TripsService,
    private router: Router,
    private toastr: ToastrService,
    private agent: AgentsService
  ) {}

  ngOnInit(): void {
    this.trip.getOngoingTrips().subscribe((trips: Object) => {
      this.onGoingTrips = trips;
    });

    this.agent.getAllAgents().subscribe((agents: Object) => {
      this.allAgents = agents;
    });
  }

  ngOnChanges(): void {
    this.trip.getOngoingTrips().subscribe((trips: Object) => {
      this.onGoingTrips = trips;
    });

    this.agent.getAllAgents().subscribe((agents: Object) => {
      this.allAgents = agents;
    });
  }

  handleCreateTrip(f: NgForm) {
    const { from, to, truckType, date } = f.form.value;

    console.log(truckType);
    this.trip.createTrip(from, to, truckType, date).subscribe({
      next: (res) => {
        this.ngOnChanges();
        this.toastr.info(res['msg']);
      },
      error: (error) => {
        this.toastr.error(error.error['err']);
      },
    });

    f.resetForm();
  }
}
