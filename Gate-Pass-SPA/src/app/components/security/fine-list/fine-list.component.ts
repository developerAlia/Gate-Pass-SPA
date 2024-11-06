import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import {
  NgbModalRef,
  NgbModal,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { VehicleList } from "src/app/shared/models/admin/vehicleList";
import { Pagination, PaginatedResult } from "src/app/shared/models/pagination";
import { AdminService } from "src/app/shared/services/admin.service";
import { SharedFunctionsService } from "src/app/shared/services/shared-functions.service";
import { FineHistoryComponent } from "../shared/modals/fine-history/fine-history.component";
import { FineIssueComponent } from "../shared/modals/fine-issue/fine-issue.component";
import { ProfileViewModalComponent } from "../shared/modals/profile-view-modal/profile-view-modal.component";

@Component({
  selector: "app-fine-list",
  templateUrl: "./fine-list.component.html",
  styleUrls: ["./fine-list.component.scss"],
})
export class FineListComponent implements OnInit {
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 0,
    totalPages: 0,
  };

  searchForm: FormGroup;
  modal: NgbModalRef;
  dataCard: VehicleList[] = [];
  tempSearch = {
    plateNumber: null,
    plateCodeId: null,
  };

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal,
    public translate: TranslateService,
    private fb: FormBuilder
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
      plateNumber: [null],
      plateCode: [null],
    });
  }

  getData() {
    console.log(this.searchForm.value);

    this.adminService
      .getVehicleList(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        +this.searchForm.value.plateNumber,
        this.searchForm.value.plateCode
      )
      .subscribe((data: PaginatedResult<VehicleList[]>) => {
        console.log(data.result);

        this.dataCard = data.result;
        this.pagination = data.pagination;
      });
  }

  search() {
    this.pagination.currentPage = 1;
    this.getData();
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

  openModalFine(vehicleId: number) {
    console.log(vehicleId);

    const inputData: {
      isEdit?: boolean;
      fineId?: number;
      vehicleId?: number;
      usersId?: number;
    } = {
      isEdit: true,
      vehicleId: vehicleId,
    };
    this.modal = this.modalService.open(FineIssueComponent, {
      centered: true,
      backdrop: true,
      size: "xl",
    });

    this.modal.componentInstance.inputData = inputData;

    this.modal.componentInstance.updateSelectedRoles.subscribe(
      (values: any) => {
        this.modal.close();
      }
    );
  }

  openModalFineHistory(id: number) {
    const inputData: { vehicleId: number } = {
      vehicleId: id,
    };
    this.modal = this.modalService.open(FineHistoryComponent, {
      centered: true,
      backdrop: true,
      size: "xl",
    });

    this.modal.componentInstance.inputData = inputData;
  }

  profileModal() {
    this.modalService.open(ProfileViewModalComponent, {
      centered: true,
      backdrop: true,
    });
  }
}
