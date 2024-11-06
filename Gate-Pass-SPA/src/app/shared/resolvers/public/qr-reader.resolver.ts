import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { QrCodeService } from "../../services/qr-code.service";

@Injectable({
  providedIn: "root",
})
export class QrReaderResolver implements Resolve<any> {
  constructor(private qrCodeService: QrCodeService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.qrCodeService.getQrCode(route.params["id"]).pipe(
      catchError((error) => {
        return of(null);
      })
    );
  }
}
