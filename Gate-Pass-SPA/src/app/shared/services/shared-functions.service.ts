import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { CheckInRequest } from "../models/admin/requestList";
import { AdminService } from "./admin.service";
declare var require;
const Swal = require("sweetalert2");

@Injectable({
  providedIn: "root",
})
export class SharedFunctionsService {
  constructor(
    private translate: TranslateService,
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  checkIn(visitDetailsId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: this.translate.instant("CheckInModal.Title"),
          icon: "warning",
          showCancelButton: true,
          // this.translate.instant("DAY")
          confirmButtonText: this.translate.instant("CheckInModal.Confirm"),
          cancelButtonText: this.translate.instant("CheckInModal.Cancel"),
          reverseButtons: false,
        })
        .then((result) => {
          if (result.isConfirmed) {
            const sendData: CheckInRequest = {
              visitCheckingId: 0,
              visitDetailsId: visitDetailsId,
            };
            this.adminService.postRequestCheckIn(sendData).subscribe((data) => {
              this.toastr.success("Saved");
            });

            swalWithBootstrapButtons.fire({
              title: this.translate.instant("CheckInModal.Title"),
              text: this.translate.instant("CheckInModal.Success"),
              icon: "success",
              timer: 3000,
            });

            resolve(true);
            // this.pagination.currentPage = 1;
            // this.getData();
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: this.translate.instant("CheckInModal.Title"),
              text: this.translate.instant("CheckInModal.Decline"),
              icon: "error",
              timer: 3000,
            });
            resolve(false);
          }
        });
    });
  }
}
