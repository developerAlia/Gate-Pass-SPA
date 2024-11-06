import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { MyGatePasses } from "src/app/shared/models/dashboard/myGatePasses";
import { ZRequestStatus } from "src/app/shared/enums/z-request-status";
import { ZRequestsTypeEnum } from "src/app/shared/enums/z-requests-type";

@Component({
  selector: "app-mygatepass",
  templateUrl: "./mygatepass.component.html",
  styleUrls: ["./mygatepass.component.scss"],
})
export class MygatepassComponent implements OnInit {
  addNewGatePass: NgbModalRef;
  public ZRequestStatus = ZRequestStatus;
  @Input() cardData: MyGatePasses;
  @Output() openModalEmit: EventEmitter<{
    requestId: number;
    isEdit: boolean;
  }> = new EventEmitter<{ requestId: number; isEdit: boolean }>();
  constructor(
    private modalService: NgbModal,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {}

  openModal(id, isEdited) {
    this.openModalEmit.emit({ requestId: id, isEdit: isEdited });
  }
}
