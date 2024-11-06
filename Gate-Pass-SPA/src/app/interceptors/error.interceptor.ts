import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toster: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const modalStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key]);
                  }
                }
                throw modalStateErrors;
              }
              else {
                console.log(error.error);
                this.toster.error(error.error, error.status);
              }
              break;
            case 401:
              console.log(error.error);
              this.toster.error(error.error, error.status);
              break;
            case 404:
              this.router.navigateByUrl('/src/main.ts');
              break;
            case 500:
              this.toster.error('Internal Server Error', error.status);
              console.log(error.error);
              break;
            default:
              this.toster.error('Something unexpected went wrong!');
              console.log(error);
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
