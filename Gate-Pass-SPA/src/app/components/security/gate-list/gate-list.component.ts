import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import {
  NgbModalRef,
  NgbModal,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { Observable, Subscription } from "rxjs";
import {
  ApprovedRequestList,
  CheckInRequest,
  RequestList,
} from "src/app/shared/models/admin/requestList";
import { Pagination, PaginatedResult } from "src/app/shared/models/pagination";
import { AdminService } from "src/app/shared/services/admin.service";
import { CheckInModalComponent } from "../modals/check-in-modal/check-in-modal.component";
import "rxjs/add/observable/interval";
import { SharedFunctionsService } from "src/app/shared/services/shared-functions.service";

declare var require;
const Swal = require("sweetalert2");

@Component({
  selector: "app-gate-list",
  templateUrl: "./gate-list.component.html",
  styleUrls: ["./gate-list.component.scss"],
})
export class GateListComponent implements OnInit, OnDestroy {
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 0,
    totalPages: 0,
  };

  subscription: Subscription;

  searchForm: FormGroup;
  modal: NgbModalRef;
  dataCard: ApprovedRequestList[] = [];
  tempSearch = {
    phone: null,
    civil: null,
  };

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    public translate: TranslateService,
    private fb: FormBuilder,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private sharedFunctions: SharedFunctionsService
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initForm();
    this.getData("false");
    this.subscription = Observable.interval(8000).subscribe(() => {
      console.log("Get Data");
      this.getData("true", this.tempSearch.phone, this.tempSearch.civil);
    });
  }

  searchReset() {
    this.searchForm.reset();
    this.tempSearch.civil = null;
    this.tempSearch.phone = null;
    this.pagination.currentPage = 1;
    this.getData();
  }

  initForm(): void {
    this.searchForm = this.fb.group({
      date: [null],
      phone: [null],
      civilId: [null],
    });

    // this.searchForm.get("date").valueChanges.subscribe((date: any) => {
    //   this.pagination.currentPage = 1;
    //   this.getData();
    // });
  }

  getData(loading?, phone?, civilId?) {
    this.adminService
      .getApprovedRequestList(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.ngbDateParserFormatter.format(this.searchForm.get("date").value),
        loading,
        phone,
        civilId
      )
      .subscribe((data: PaginatedResult<ApprovedRequestList[]>) => {
        this.dataCard = data.result;
        this.pagination = data.pagination;
      });
  }

  search() {
    this.tempSearch.civil = this.searchForm.get("civilId").value;
    this.tempSearch.phone = this.searchForm.get("phone").value;
    this.pagination.currentPage = 1;
    this.getData("false", this.tempSearch.phone, this.tempSearch.civil);
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

  openDetailsModal(requestsId: number) {
    const inputData: {
      requestsId?: number;
    } = {
      requestsId: requestsId,
    };
    this.modal = this.modalService.open(CheckInModalComponent, {
      centered: true,
      backdrop: true,
      size: "xl",
    });
    this.modal.componentInstance.inputData = inputData;
  }

  checkIn(visitDetailsId: number) {
    this.sharedFunctions.checkIn(visitDetailsId).then((isChecked: boolean) => {
      if (isChecked == true) {
        this.pagination.currentPage = 1;
        this.getData();
      }
    });
  }
}
