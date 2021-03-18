import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AgentsService {
  url = 'http://localhost:6500';

  constructor(private http: HttpClient) {}

  createAgent(name, location, truckType) {
    return this.http.post(`${this.url}/agent/createAgent`, {
      name,
      location,
      truckType,
    });
  }

  getAllAgents() {
    return this.http.get(`${this.url}/agent/getAllAgents`, {
      responseType: 'json',
    });
  }
}
