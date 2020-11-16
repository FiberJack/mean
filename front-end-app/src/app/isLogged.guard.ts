import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class IsLoggedIn implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {
        // console.log( this.authService.isAuthenticated() );
        if(this.authService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['reg']);
            return false;
        }
    }

}