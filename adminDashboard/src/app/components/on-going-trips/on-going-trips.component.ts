import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AgentsService } from 'src/app/services/agents.service';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-on-going-trips',
  templateUrl: './on-going-trips.component.html',
  styleUrls: ['./on-going-trips.component.css'],
})
export class OnGoingTripsComponent implements OnInit, OnChanges {
  @Input() trip;
  allAgents;

  onGoingTrips;
  selectedTripId: String;
  selectedAgentName: String;

  constructor(
    private agent: AgentsService,
    private toastr: ToastrService,
    private tripService: TripsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.agent.getAllAgents().subscribe({
      next: (res) => (this.allAgents = res),
      error: (err) => this.toastr.error(err.error['err']),
    });
  }

  ngOnChanges(): void {
    this.tripService.getOngoingTrips().subscribe({
      next: (res) => (this.onGoingTrips = res),
      error: (err) => this.toastr.error(err.error['err']),
    });
  }

  update(e) {
    this.selectedTripId = e.target.id;
    this.selectedAgentName = e.target.value;
  }

  assignAgent() {
    if (!this.selectedAgentName && !this.selectedTripId) {
      return this.toastr.error('No Agent Selected');
    } else {
      this.tripService
        .assignAgentToTrip(this.selectedTripId, this.selectedAgentName)
        .subscribe({
          next: (res) => {
            this.router.navigateByUrl('home');
            this.toastr.info(res['msg']);
            this.ngOnChanges();
          },
          error: (err) => {
            console.log(err);
            this.toastr.error(err.error['err']);
          },
        });
    }
  }
}
