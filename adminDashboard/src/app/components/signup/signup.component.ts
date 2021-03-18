import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private data: DataService
  ) {}

  ngOnInit(): void {}

  handleSignUp(f: NgForm) {
    const { email, password } = f.form.value;

    this.auth.signup(email, password).subscribe({
      next: (user) => {
        this.data.setCurrentUser(user);
        this.router.navigateByUrl('home');
        this.toastr.success(user['msg']);
      },
      error: (err) => this.toastr.error(err.error['err']),
    });
  }
}
