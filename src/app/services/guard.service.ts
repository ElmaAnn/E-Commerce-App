import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  path: import('@angular/router').ActivatedRouteSnapshot[];
  route: import('@angular/router').ActivatedRouteSnapshot[];
  canActivate(path, route): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve) => {
      this.authService.user.subscribe((user) => {
        if (user) resolve(true);
        else {
          this.router.navigate(['/login']);
        }
      });
    });
  }
}
