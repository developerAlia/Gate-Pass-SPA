import { Component, Input, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  VisitChecking,
  VisitDetails4Admin,
} from "src/app/shared/models/admin/visitDetails";
import { PaginatedResult, Pagination } from "src/app/shared/models/pagination";
import { AdminService } from "src/app/shared/services/admin.service";

@Component({
  selector: "check-in-details",
  templateUrl: "./check-in-details.component.html",
  styleUrls: ["./check-in-details.component.scss"],
})
export class CheckInDetailsComponent implements OnInit {
  @Input() checkInData: VisitDetails4Admin;

  @Input() pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 0,
    totalPages: 0,
  };
  @Input() checkInDetails: VisitChecking[] = [];

  constructor(
    public translate: TranslateService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {}

  changePage(event: any) {
    this.pagination.currentPage = event;

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
}
