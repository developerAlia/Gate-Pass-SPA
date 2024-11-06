import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import {
  NgbModalRef,
  NgbModal,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { ZRequestsTypeEnum } from "src/app/shared/enums/z-requests-type";
import { RequestList } from "src/app/shared/models/admin/requestList";
import { Pagination, PaginatedResult } from "src/app/shared/models/pagination";
import { AdminService } from "src/app/shared/services/admin.service";
import { GatePassModalComponent } from "../../gatepass/user-profile/modals/gate-pass-modal/gate-pass-modal.component";
import { VisitorModalComponent } from "../../gatepass/user-profile/modals/visitor-modal/visitor-modal.component";

@Component({
  selector: "app-request-report",
  templateUrl: "./request-report.component.html",
  styleUrls: ["./request-report.component.scss"],
})
export class RequestReportComponent implements OnInit {
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 0,
    totalPages: 0,
  };

  searchForm: FormGroup;
  modal: NgbModalRef;
  dataCard: RequestList[] = [];

  constructor(
    private adminService: AdminService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.initForm(), this.getData();
  }
  initForm(): void {
    this.searchForm = this.fb.group({
      zUserTypeId: [null],
      zRequestsTypesId: [null],
      zRequestsStatusId: [null],
      date: [null],
    });

    this.searchForm
      .get("zUserTypeId")
      .valueChanges.subscribe((data: number) => {
        this.pagination.currentPage = 1;
        this.getData();
      });
    this.searchForm
      .get("zRequestsTypesId")
      .valueChanges.subscribe((data: number) => {
        this.pagination.currentPage = 1;
        this.getData();
      });
    this.searchForm
      .get("zRequestsStatusId")
      .valueChanges.subscribe((data: number) => {
        this.pagination.currentPage = 1;
        this.getData();
      });
    this.searchForm.get("date").valueChanges.subscribe((data) => {
      this.pagination.currentPage = 1;
      this.getData();
    });
  }

  searchReset() {
    this.searchForm.reset();
    this.pagination.currentPage = 1;
    this.getData();
  }

  getData() {


    this.adminService
      .getRequestListReport(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.searchForm.get("zUserTypeId").value,
        this.searchForm.get("zRequestsTypesId").value,
        this.searchForm.get("zRequestsStatusId").value,
        this.ngbDateParserFormatter.format(this.searchForm.get("date").value)
      )
      .subscribe((data: PaginatedResult<RequestList[]>) => {
        this.dataCard = data.result;
        this.pagination = data.pagination;
      });
  }

  changePage(event: any) {
    this.pagination.currentPage = event;
    //To Scroll to top of page when page changes
    this.topPage(), this.getData();
  }

  //To Scroll top of page
  topPage() {
    window.scroll(0, 0);
  }

  openRequest(requestsId, requestTypeId) {

    const inputData: {
      usersId?: number;
      isOfficer?: boolean;
      isEdit?: boolean;
      isSecurity?: boolean;
      requestsId?: number;
    } = {
      requestsId: requestsId,
      isSecurity: false,
      isEdit: false,
    };

    switch (requestTypeId) {
      case ZRequestsTypeEnum.Vehicle:
        this.openModal(GatePassModalComponent, inputData);

        break;
      case ZRequestsTypeEnum.DrivingLicense:
        break;
      case ZRequestsTypeEnum.Visitor:
        this.openModal(VisitorModalComponent, inputData);

        break;
      case ZRequestsTypeEnum.Resident:
        // const inputData: {
        //   usersId: number;
        //   isOfficer: boolean;
        //   isEdit: boolean;
        //   isSecurity?:boolean;
        // };
        this.openModal(VisitorModalComponent, inputData);
        break;
      case ZRequestsTypeEnum.Trainee:
        break;

      default:
        this.toastrService.error("Error in shown data!");
        break;
    }
  }
  openModal(modalComponent: any, inputData) {
    this.modal = this.modalService.open(modalComponent, {
      centered: true,
      backdrop: true,
      size: "xl",
    });
    this.modal.componentInstance.inputData = inputData;
    this.modal.componentInstance.updateSelectedRoles.subscribe(
      (values: boolean) => {
        this.modal.close();
        if (values == true) {
          this.pagination.currentPage = 1;
          this.getData();
        }
      }
    );
  }
}
