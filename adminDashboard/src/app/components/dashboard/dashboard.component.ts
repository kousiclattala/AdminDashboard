import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AgentsService } from 'src/app/services/agents.service';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalTrips: any;
  totalAgents: any;

  trips: Object;
  agents: Object;

  constructor(
    private trip: TripsService,
    private agent: AgentsService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.agent.getAllAgents().subscribe((agents: Object) => {
      this.agents = agents;

      this.totalAgents = this.agents.valueOf();
    });

    this.trip.getAllTrips().subscribe((trips: Object) => {
      this.trips = trips;

      this.totalTrips = this.trips.valueOf();
    });
  }
}
