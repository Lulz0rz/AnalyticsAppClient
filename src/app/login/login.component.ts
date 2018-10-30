import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { error } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user: User = {
    Username: '',
    Password: ''
  };

  attemptedLogin: boolean = false;
  success: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.attemptedLogin = false;
    this.success = false;
  }

  onSubmit() {
    this.attemptedLogin = true;

    this.authService.login(this.user)
    .subscribe(response => {
      this.success = true;
      this.authService.setToken(response.token);
      this.router.navigate(['/']);
    }, error => {
      this.success = false;
      this.user.Password = '';
    });
  }

}
