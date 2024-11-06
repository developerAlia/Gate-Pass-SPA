import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { Sys_userInfo } from "../models/sys/sys_userInfo";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user: Sys_userInfo = JSON.parse(localStorage.getItem("gatePassUser"));
    if (user) {
      if (this.authService.tokenExpired(user.token)) {
        this.authService.logout();
        this.router.navigate(["/auth/login"], {
          queryParams:
            state.url == "/dashboard/dashboard-component"
              ? null
              : { returnUrl: state.url },
        });
        return false;
      } else {
        // user.langPref = "en";
        this.authService.setCurrentUser(user);
        return true;
      }
    } else {
      this.router.navigate(["/auth/login"], {
        queryParams:
          state.url == "/dashboard/dashboard-component"
            ? null
            : { returnUrl: state.url },
      });
      return false;
    }
  }
}
