import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { VehicleFines } from "src/app/shared/models/gatepass/vehicleFines";
import { PaginatedResult, Pagination } from "src/app/shared/models/pagination";
import { GatePassService } from "src/app/shared/services/gatepass.service";

@Component({
  selector: "app-fine-history",
  templateUrl: "./fine-history.component.html",
  styleUrls: ["./fine-history.component.scss"],
})
export class FineHistoryComponent implements OnInit {
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 0,
    totalPages: 0,
  };

  @Input() inputData: { vehicleId: number };

  dataCard: VehicleFines[];

  constructor(
    private modal: NgbActiveModal,
    private gatePassService: GatePassService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // console.log(this.inputData);
    this.getData();
  }

  getData(): void {
    this.gatePassService
      .getFinesByVehicleId(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.inputData.vehicleId
      )
      .subscribe((data: PaginatedResult<VehicleFines[]>) => {
        this.dataCard = data.result;
        this.pagination = data.pagination;
      });
  }

  closeModal(): void {
    this.modal.close();
  }

  changePage(event: any) {
    this.pagination.currentPage = event;
    this.getData();
    //To Scroll to top of page when page changes
    // this.topPage();
  }

  //To Scroll top of page
  topPage() {
    window.scroll(0, 0);
  }
}
