import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  login: String;
  password: String;

  constructor(
    private router: Router,
    private authService: AuthService,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit(): void {
  }

  userLoginClick() {
    const user = {
      login: this.login,
      password: this.password
    };

    if (user.password == undefined) {
      this.flashMessages.show("Введите пароль", {
        cssClass: 'alert-danger',
        timeout: 2000
      });
      return false;
    }

    this.authService.authUser(user).subscribe(data => {
      if(!data.success) {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 2000
        });
      } else {
        this.flashMessages.show("Вы успешно авторизовались", {
          cssClass: 'alert-success',
          timeout: 2000
        });
        this.router.navigate(['dashboard']);
        this.authService.storeUser(data.token, data.user);
      }
    });
  }

}
