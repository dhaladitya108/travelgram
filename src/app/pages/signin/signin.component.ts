import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit(f: NgForm) {
    const { email, password } = f.form.value;
    this.auth
      .signIn(email, password)
      .then((res) => {
        this.toastr.success('Signin Successful', '', {
          closeButton: true,
        });
        this.router.navigateByUrl('/');
      })
      .catch((err) => {
        this.toastr.error(err, '', {
          closeButton: true,
        });
      });
  }
}
