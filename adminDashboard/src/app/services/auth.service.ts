import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:6500';

  constructor(private http: HttpClient) {}

  getAllUser() {
    return this.http.get(`${this.url}/auth/allUsers`);
  }

  getUser() {
    return this.http.get(`${this.url}/auth/singleUser/:id`);
  }

  addUser(email, password) {
    return this.http.post(`${this.url}/auth/addUser`, { email, password });
  }

  signin(email, password) {
    return this.http.post(`${this.url}/auth/signin`, { email, password });
  }

  signup(email, password) {
    return this.http.post(`${this.url}/auth/signup`, { email, password });
  }

  logout() {
    return this.http.get(`${this.url}/auth/signout`);
  }
}
