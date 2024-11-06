import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { MyGatePasses } from "src/app/shared/models/dashboard/myGatePasses";
import { PaginatedResult, Pagination } from "src/app/shared/models/pagination";
import { DashboardService } from "src/app/shared/services/dashboard.service";
import { GatePassService } from "src/app/shared/services/gatepass.service";
import { GatepassmodalComponent } from "../../../gatepassmodal/gatepassmodal.component";
import { GatePassModalComponent } from "../../modals/gate-pass-modal/gate-pass-modal.component";

@Component({
  selector: "app-gate-pass-section",
  templateUrl: "./gate-pass-section.component.html",
  styleUrls: ["./gate-pass-section.component.scss"],
})
export class GatePassSectionComponent implements OnInit {
  @Input() usersId: number;
  cardData: MyGatePasses[] = [];
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 2,
    totalItems: 0,
    totalPages: 0,
  };

  searchForm: FormGroup;

  modal: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private dashboardService: DashboardService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
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
      .getMyGatePassesCard(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.usersId
      )
      .subscribe((data: PaginatedResult<MyGatePasses[]>) => {
        this.cardData = data.result;
        this.pagination = data.pagination;
      });
  }

  // newGatePassModal() {
  //   this.modalRef = this.modalService.open(GatepassmodalComponent, {
  //     centered: true,
  //     backdrop: true,
  //     size: "xl",
  //   });
  // }

  openModal(requestsId: number, isEdited: boolean) {
    const inputData: {
      usersId?: number;
      isEdit?: boolean;
      isSecurity?: boolean;
      requestsId?: number;
    } = {
      requestsId: requestsId,
      isSecurity: false,
      usersId: this.usersId,
      isEdit: isEdited,
    };
    this.modal = this.modalService.open(GatePassModalComponent, {
      centered: true,
      backdrop: true,
      size: "xl",
    });

    this.modal.componentInstance.inputData = inputData;

    this.modal.componentInstance.updateSelectedRoles.subscribe(
      (values: MyGatePasses) => {
        // console.log(values);

        this.modal.close();
        if (values !== null) {
          if (requestsId == 0) {
            this.cardData.push(values);
          } else {
            //Request Status
            this.cardData.find(
              (e) => e.requestsId === values.requestsId
            ).zRequestsStatusNameAr = values.zRequestsStatusNameAr;
            this.cardData.find(
              (e) => e.requestsId === values.requestsId
            ).zRequestsStatusNameEn = values.zRequestsStatusNameEn;
            this.cardData.find(
              (e) => e.requestsId === values.requestsId
            ).zRequestsStatusId = values.zRequestsStatusId;
            this.cardData.find(
              (e) => e.requestsId === values.requestsId
            ).zRequestsStatusColorClass = values.zRequestsStatusColorClass;

            //Maker
            this.cardData.find(
              (e) => e.requestsId === values.requestsId
            ).zVehicleMakerNameAr = values.zVehicleMakerNameAr;
            this.cardData.find(
              (e) => e.requestsId === values.requestsId
            ).zVehicleMakerNameEn = values.zVehicleMakerNameEn;
            //Model
            this.cardData.find(
              (e) => e.requestsId === values.requestsId
            ).zVehicleModelNameAr = values.zVehicleModelNameAr;
            this.cardData.find(
              (e) => e.requestsId === values.requestsId
            ).zVehicleModelNameEn = values.zVehicleModelNameEn;

            //Plate Number
            this.cardData.find(
              (e) => e.requestsId === values.requestsId
            ).plateNumber = values.plateNumber;
            this.cardData.find(
              (e) => e.requestsId === values.requestsId
            ).vehicleId = values.vehicleId;
            //PlateCode
            this.cardData.find(
              (e) => e.requestsId === values.requestsId
            ).zPlateCodeNameAr = values.zPlateCodeNameAr;
            this.cardData.find(
              (e) => e.requestsId === values.requestsId
            ).zPlateCodeNameEn = values.zPlateCodeNameEn;
            //Plate Colors
            this.cardData.find(
              (e) => e.requestsId === values.requestsId
            ).zOwnershipTypeColorClass = values.zOwnershipTypeColorClass;
            this.cardData.find(
              (e) => e.requestsId === values.requestsId
            ).zOwnershipTypeTextColor = values.zOwnershipTypeTextColor;
            this.cardData.find(
              (e) => e.requestsId === values.requestsId
            ).vehicleId = values.vehicleId;
          }
        }
      }
    );
  }

  changePage(event: any) {
    this.pagination.currentPage = event;
    //To Scroll to top of page when page changes
    this.topPage(), this.getCardData();
  }

  topPage() {
    window.scroll(0, 0);
  }
}
