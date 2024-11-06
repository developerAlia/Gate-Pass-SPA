import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { map, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService,
    private alertify: ToastrService) { }
  canActivate(next: ActivatedRouteSnapshot): | boolean {
    const roles = next.firstChild.data.roles as Array<string>;
    let x = false;
    if (roles) {
      this.authService.currentUser$.pipe(take(1)).subscribe(
        user => {
          if (user.token) {
            roles.forEach(r => {
              if (user.roles.find(e => e === r)) {
                x = true;
              }
            });
          }
        });
    }
    if (x) {
      return true;
    } else {
      this.router.navigate(['/dashboard/default']);
      this.alertify.error('You are not authorised to access this area');
      return false;
    }

  }
}

