import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  user: Object;
  currentUser: Object;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private data: DataService
  ) {}

  ngOnInit(): void {}

  handleSignIn(f: NgForm) {
    const { email, password } = f.form.value;

    this.auth.signin(email, password).subscribe({
      next: (res) => {
        this.data.setCurrentUser(res);
        this.router.navigateByUrl('home');
        this.toastr.success(res['msg']);
      },
      error: (err) => {
        console.log(JSON.stringify(err));
        this.toastr.error(err.error['err']);
      },
    });
  }
}
