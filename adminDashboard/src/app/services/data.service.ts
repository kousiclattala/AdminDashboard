import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public eventEmitter = new EventEmitter();
  constructor() {}

  setCurrentUser(user: Object) {
    this.eventEmitter.emit(user);
  }
}
