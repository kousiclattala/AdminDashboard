import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DataService } from './services/data.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  getToken;
  setToken = this.dataService.eventEmitter.subscribe((data) => {
    this.getToken = data['token'];
  });

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.getToken) {
      if (!req.headers.has('token')) {
        req = req.clone({ setHeaders: { token: this.getToken } });
      }
    } else {
      this.router.navigateByUrl('signin');
    }
    return next.handle(req);
  }
}
