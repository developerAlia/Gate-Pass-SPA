import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { MyVisitors } from "src/app/shared/models/dashboard/myVisitors";
import { ResponsePostRequest } from "src/app/shared/models/gatepass/gate-pass-request";
import { PaginatedResult, Pagination } from "src/app/shared/models/pagination";
import { DashboardService } from "src/app/shared/services/dashboard.service";
import { VisitorModalComponent } from "../../modals/visitor-modal/visitor-modal.component";

@Component({
  selector: "app-visitor-section",
  templateUrl: "./visitor-section.component.html",
  styleUrls: ["./visitor-section.component.scss"],
})
export class VisitorSectionComponent implements OnInit {
  modal: NgbModalRef;
  @Input() isOfficer: boolean;
  @Input() usersId: number;
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 2,
    totalItems: 0,
    totalPages: 0,
  };
  cardData: MyVisitors[] = [];
  searchForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private dashboardService: DashboardService,
    private fb: FormBuilder
  ) {
    // console.log(this.isOfficer);
  }

  ngOnInit(): void {
    // console.log(this.isOfficer);
    this.initForm();
    this.getCardData();
  }

  initForm(): void {
    this.searchForm = this.fb.group({
      month: [null],
    });

    this.searchForm.get("month").valueChanges.subscribe((data) => {
      this.pagination.currentPage = 1;
      this.getCardData();
    });
  }

  reset() {
    this.searchForm.reset();
    this.pagination.currentPage = 1;
    this.getCardData();
  }

  getCardData() {
    this.dashboardService
      .getMyVisitorsCard(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.usersId,
        this.searchForm.get("month").value
      )
      .subscribe((data: PaginatedResult<MyVisitors[]>) => {
        this.cardData = data.result;
        this.pagination = data.pagination;
        // console.log(data.result);

      });
  }

  changePage(event: any) {
    this.pagination.currentPage = event;
    //To Scroll to top of page when page changes
    this.topPage(), this.getCardData();
  }

  //To Scroll top of page
  topPage() {
    window.scroll(0, 0);
  }

  openModal(requestsId: number, isEdited: boolean) {
    const inputData: {
      usersId?: number;
      isOfficer?: boolean;
      isEdit?: boolean;
      isSecurity?: boolean;
      requestsId?: number;
    } = {
      requestsId: requestsId,
      isSecurity: false,
      usersId: this.usersId,
      isEdit: isEdited,
      isOfficer: this.isOfficer,
    };
    this.modal = this.modalService.open(VisitorModalComponent, {
      centered: true,
      backdrop: true,
      size: "xl",
    });

    this.modal.componentInstance.inputData = inputData;
    this.modal.componentInstance.updateSelectedRoles.subscribe(
      (values: MyVisitors) => {
        this.modal.close();
        if (values !== null) {
          if (requestsId == 0) {
            this.cardData.push(values);
          } else {
            this.cardData.find(
              (e) => e.requestsId === values.requestsId
            ).zRequestsStatusColorClass = values.zRequestsStatusColorClass;
            this.cardData.find(
              (e) => e.requestsId === values.requestsId
            ).zRequestsStatusId = values.zRequestsStatusId;
            this.cardData.find(
              (e) => e.requestsId === values.requestsId
            ).zRequestsStatusNameAr = values.zRequestsStatusNameAr;
            this.cardData.find(
              (e) => e.requestsId === values.requestsId
            ).zRequestsStatusNameEn = values.zRequestsStatusNameEn;
          }
        }
      }
    );
  }
}
