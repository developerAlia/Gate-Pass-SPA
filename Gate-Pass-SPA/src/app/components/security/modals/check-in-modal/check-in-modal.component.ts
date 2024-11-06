import { Component, Input, OnInit } from "@angular/core";
import {
  NgbActiveModal,
  NgbModal,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import {
  VisitChecking,
  VisitDetails4Admin,
} from "src/app/shared/models/admin/visitDetails";
import { PaginatedResult, Pagination } from "src/app/shared/models/pagination";
import { AdminService } from "src/app/shared/services/admin.service";

@Component({
  selector: "app-check-in-modal",
  templateUrl: "./check-in-modal.component.html",
  styleUrls: ["./check-in-modal.component.scss"],
})
export class CheckInModalComponent implements OnInit {
  @Input() inputData: {
    requestsId?: number;
  };

  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 3,
    totalItems: 0,
    totalPages: 0,
  };

  checkInData: VisitDetails4Admin;
  checkInDetails: VisitChecking[] = [];
  modalTitle: any;

  constructor(
    private modal: NgbActiveModal,
    private adminService: AdminService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    // this.inputData.requestsId = 27;
    this.adminService
      .getRequestCheckIn(this.inputData.requestsId)
      .subscribe((data: VisitDetails4Admin) => {
        this.checkInData = data;

        this.adminService
          .getRequestCheckInDetails(
            data.visitDetailsId,
            this.pagination.currentPage,
            this.pagination.itemsPerPage
          )
          .subscribe((data: PaginatedResult<VisitChecking[]>) => {
            this.pagination = data.pagination;
            this.checkInDetails = data.result;
          });
      });
  }

  closeModal(): void {
    // modal.close();
    this.modal.close();
  }
}
