import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: Object;
  eventSub: Subscription;

  constructor(
    private data: DataService,
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.eventSub = this.data.eventEmitter.subscribe((user) => {
      this.user = user;
    });
  }

  handleLogout() {
    this.auth.logout().subscribe({
      next: (msg) => {
        this.toastr.info(msg['msg']);
        this.router.navigateByUrl('signin');
      },
      error: (err) => this.toastr.error(err),
    });

    this.user = null;
  }
}
