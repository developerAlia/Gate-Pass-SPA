import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import {
  NgbModalRef,
  NgbModal,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { CheckedInList } from "src/app/shared/models/admin/checkedInList";
import { Pagination, PaginatedResult } from "src/app/shared/models/pagination";
import { AdminService } from "src/app/shared/services/admin.service";
import { CheckInModalComponent } from "../../security/modals/check-in-modal/check-in-modal.component";

@Component({
  selector: "app-checked-in-report",
  templateUrl: "./checked-in-report.component.html",
  styleUrls: ["./checked-in-report.component.scss"],
})
export class CheckedInReportComponent implements OnInit {
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 0,
    totalPages: 0,
  };

  searchForm: FormGroup;
  modal: NgbModalRef;
  dataCard: CheckedInList[] = [];

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal,
    public translate: TranslateService,
    private fb: FormBuilder,
    private ngbDateParserFormatter: NgbDateParserFormatter
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getData();
  }

  searchReset() {
    this.searchForm.reset();
    this.pagination.currentPage = 1;
    this.getData();
  }

  initForm(): void {
    this.searchForm = this.fb.group({
      date: [null],
    });

    this.searchForm.get("date").valueChanges.subscribe((date: any) => {
      this.pagination.currentPage = 1;
      this.getData();
    });
  }

  getData() {
    this.adminService
      .getCheckedInList(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.ngbDateParserFormatter.format(this.searchForm.get("date").value)
      )
      .subscribe((data: PaginatedResult<CheckedInList[]>) => {
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
}
