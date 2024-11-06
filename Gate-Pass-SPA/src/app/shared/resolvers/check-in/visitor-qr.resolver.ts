import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { VisitDetails4Admin } from "../../models/admin/visitDetails";
import { AdminService } from "../../services/admin.service";

@Injectable({
  providedIn: "root",
})
export class VisitorQrResolver implements Resolve<VisitDetails4Admin> {
  constructor(private adminService: AdminService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<VisitDetails4Admin> {
    return this.adminService.getRequestCheckIn(route.params["id"]).pipe(
      catchError((error) => {
        return of(null);
      })
    );
  }
}
