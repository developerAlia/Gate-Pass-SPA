import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { VehicleList } from "src/app/shared/models/admin/vehicleList";
import { MyFines } from "src/app/shared/models/dashboard/myFines";
import { Pagination, PaginatedResult } from "src/app/shared/models/pagination";
import { DashboardService } from "src/app/shared/services/dashboard.service";

@Component({
  selector: "app-fine-section",
  templateUrl: "./fine-section.component.html",
  styleUrls: ["./fine-section.component.scss"],
})
export class FineSectionComponent implements OnInit {
  @Input() usersId: number;
  cardData: MyFines[] = [];
  vehicleData: VehicleList[] = [];
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 2,
    totalItems: 0,
    totalPages: 0,
  };
  searchForm: FormGroup;

  modal: NgbModalRef;

  constructor(
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCardData();
    this.getCarsData();
  }

  initForm(): void {
    this.searchForm = this.fb.group({
      vehicleId: [null],
    });
    this.searchForm.get("vehicleId").valueChanges.subscribe((data) => {
      this.getCardData(data);
    });
  }
  getCarsData() {
    this.dashboardService
      .getMyVehicle(this.usersId)
      .subscribe((data: VehicleList[]) => {
        this.vehicleData = data;
      });
  }

  getCardData(vehicleId?: number) {
    this.dashboardService
      .getMyFinesCard(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.usersId,
        vehicleId
      )
      .subscribe((data: PaginatedResult<MyFines[]>) => {
        this.cardData = data.result;
        this.pagination = data.pagination;
      });
  }

  changePage(event: any) {
    this.pagination.currentPage = event;
    //To Scroll to top of page when page changes
    this.topPage(), this.getCardData();
  }

  topPage() {
    window.scroll(0, 0);
  }
  reset() {
    this.searchForm.reset();
    this.pagination.currentPage = 1;
    this.getCardData();
  }
}
