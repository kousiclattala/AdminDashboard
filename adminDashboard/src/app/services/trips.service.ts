import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  url = 'http://localhost:6500';

  constructor(private http: HttpClient) {}

  createTrip(from, to, truckType, date) {
    return this.http.post(`${this.url}/trip/addTrip`, {
      from,
      to,
      truckType,
      date,
    });
  }

  getOngoingTrips() {
    return this.http.get(`${this.url}/trip/ongoingTrips`);
  }

  assignAgentToTrip(tripId, agentName) {
    return this.http.post(`${this.url}/trip/${tripId}/assignAgent`, {
      tripId,
      agentName,
    });
  }

  getAllTrips() {
    return this.http.get(`${this.url}/trip/getAllTrips`);
  }
}
