import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { GatePassService } from '../../services/gatepass.service';
import { UsersCard } from '../../models/gatepass/GatePassUser';
import { AdminService } from '../../services/admin.service';


@Injectable()
export class UsersCardResolver implements Resolve<UsersCard[]> {
    pageNumber = 1;
    pageSize = 6;

    constructor(private router: Router, private adminService: AdminService,
        private toastrService: ToastrService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<UsersCard[]> {
        return this.adminService.getUsersCard(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.toastrService.error('problem reteving data');
                // this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
