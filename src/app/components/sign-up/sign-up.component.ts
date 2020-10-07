import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  errorMsg: string = '';
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  signup(form) {
    // console.log(form.value.email);
    // console.log(form.value.pwd);

    this.authService
      .signUp(form.value.email, form.value.pwd)
      .then((data) => {
        this.userService.addNewUser(
          data.user.uid,
          form.value.name,
          form.value.address
        );
        this.errorMsg = '';
        this.router.navigate(['/']);
      })
      .catch((err) => (this.errorMsg = err));
  }
}
