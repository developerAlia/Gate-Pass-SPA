import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { take } from 'rxjs/operators';
import { Sys_userInfo } from '../shared/models/sys/sys_userInfo';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AuthService, private toster: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser: Sys_userInfo;
    this.accountService.currentUser$.pipe(take(1)).subscribe(
      user => currentUser = user
    );
    if (currentUser) {
      request = request.clone(
        {
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`
          }
        }
      );
    }
    return next.handle(request);
  }
}
