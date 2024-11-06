import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { Fine } from "src/app/shared/models/admin/fine";
import { VehicleById } from "src/app/shared/models/gatepass/vehicle";
import { AdminService } from "src/app/shared/services/admin.service";
import { GatePassService } from "src/app/shared/services/gatepass.service";
import { ProfileViewModalComponent } from "../profile-view-modal/profile-view-modal.component";
declare var require;
const Swal = require("sweetalert2");

@Component({
  selector: "app-fine-issue",
  templateUrl: "./fine-issue.component.html",
  styleUrls: ["./fine-issue.component.scss"],
})
export class FineIssueComponent implements OnInit {
  @Input() inputData: {
    isEdit?: boolean;
    fineId?: number;
    vehicleId?: number;
    usersId?: number;
  } = {
    isEdit: true,
  };

  modalProfile: NgbModalRef;

  vehicleData: VehicleById;
  @Output() updateSelectedRoles = new EventEmitter();
  fineForm: FormGroup;
  constructor(
    private modal: NgbActiveModal,
    private fb: FormBuilder,
    private gatePassService: GatePassService,
    private translate: TranslateService,
    private modalService: NgbModal,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.getData();
    }, 1);
  }
  getData() {
    this.gatePassService
      .getVehicleById(this.inputData.vehicleId)
      .subscribe((data: VehicleById) => {
        this.vehicleData = data;
        this.initForm();
      });
  }

  initForm(): void {
    this.fineForm = this.fb.group({
      vehicleId: [this.vehicleData.vehicleId, Validators.required],
      zFinesTypeId: [null, Validators.required],
      zFinesReasonId: [null, Validators.required],
      notes: [null],
      fineId: [0],
    });
  }
  closeModal(): void {
    // modal.close();
    this.modal.close();
  }
  onSubmit(): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: this.translate.instant("FineModal.Title"),
        icon: "warning",
        showCancelButton: true,
        // this.translate.instant("DAY")
        confirmButtonText: this.translate.instant("FineModal.Confirm"),
        cancelButtonText: this.translate.instant("FineModal.Cancel"),
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const dataSend: Fine = {
            fineId: this.fineForm.value.fineId,
            vehicleId: this.fineForm.value.vehicleId,
            zFinesReasonId: this.fineForm.value.zFinesReasonId,
            notes: this.fineForm.value.notes,
          };
          console.log(dataSend);

          this.adminService.postFine(dataSend).subscribe(
            (data: any) => {
              swalWithBootstrapButtons.fire({
                title: this.translate.instant("FineModal.Title"),
                text: this.translate.instant("FineModal.Success"),
                icon: "success",
                timer: 3000,
              });
              this.modal.close();
            },
            (err) => {
              swalWithBootstrapButtons.fire({
                title: this.translate.instant("FineModal.Title"),
                text: this.translate.instant("FineModal.Error"),
                icon: "error",
                timer: 3000,
              });
            }
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: this.translate.instant("FineModal.Title"),
            text: this.translate.instant("FineModal.Decline"),
            icon: "error",
            timer: 3000,
          });
        }
      });
  }

  openProfileDetails(): void {
    this.modalProfile = this.modalService.open(ProfileViewModalComponent, {
      centered: true,
      backdrop: true,
    });

    this.modalProfile.componentInstance.usersId = this.vehicleData.usersId;
  }
}
