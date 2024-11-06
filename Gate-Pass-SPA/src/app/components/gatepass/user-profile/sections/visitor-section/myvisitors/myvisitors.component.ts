import { GatepassmodalComponent } from "../../../../gatepassmodal/gatepassmodal.component";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { MyVisitors } from "src/app/shared/models/dashboard/myVisitors";
import { TranslateService } from "@ngx-translate/core";
import { ZRequestStatus } from "src/app/shared/enums/z-request-status";

@Component({
  selector: "app-myvisitors",
  templateUrl: "./myvisitors.component.html",
  styleUrls: ["./myvisitors.component.scss"],
})
export class MyvisitorsComponent implements OnInit {
  addNewVisitor: NgbModalRef;
  public ZRequestStatus = ZRequestStatus;
  @Input() cardData: MyVisitors;
  @Input() isOfficer: boolean;
  @Output() openModalEmit: EventEmitter<{
    requestId: number;
    isEdit: boolean;
  }> = new EventEmitter<{ requestId: number; isEdit: boolean }>();
  constructor(
    private modalService: NgbModal,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {}

  openModal(id: number, isEdited: boolean) {
    this.openModalEmit.emit({ requestId: id, isEdit: isEdited });
  }
}
