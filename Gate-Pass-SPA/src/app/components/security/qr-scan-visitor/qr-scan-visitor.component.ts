import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import {
  VisitChecking,
  VisitDetails4Admin,
} from "src/app/shared/models/admin/visitDetails";
import { PaginatedResult, Pagination } from "src/app/shared/models/pagination";
import { AdminService } from "src/app/shared/services/admin.service";
import { SharedFunctionsService } from "src/app/shared/services/shared-functions.service";

@Component({
  selector: "app-qr-scan-visitor",
  templateUrl: "./qr-scan-visitor.component.html",
  styleUrls: ["./qr-scan-visitor.component.scss"],
})
export class QrScanVisitorComponent implements OnInit {
  @Input() checkInData: VisitDetails4Admin = null;
  @Input() pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 3,
    totalItems: 0,
    totalPages: 0,
  };
  checkInDetails: VisitChecking[] = [];

  constructor(
    public route: ActivatedRoute,
    private sharedFunctions: SharedFunctionsService,
    private toastr: ToastrService,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.route.data.subscribe(
      (data: { path: string; data: VisitDetails4Admin }) => {
        if (data.data != null) {
          this.checkInData = data.data;

          this.adminService
            .getRequestCheckInDetails(
              this.checkInData.visitDetailsId,
              this.pagination.currentPage,
              this.pagination.itemsPerPage
            )
            .subscribe((data: PaginatedResult<VisitChecking[]>) => {
              this.pagination = data.pagination;
              this.checkInDetails = data.result;
            });
        }
      },
      () => this.toastr.error("error")
    );
  }

  checkIn() {
    this.sharedFunctions
      .checkIn(this.checkInData.visitDetailsId)
      .then((isChecked: boolean) => {
        if (isChecked == true) {
          this.router.navigate(["security/gatelist"]);
        }
      });
  }
}
