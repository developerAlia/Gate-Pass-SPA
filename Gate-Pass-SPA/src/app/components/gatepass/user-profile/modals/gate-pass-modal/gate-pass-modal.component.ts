import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  NgbActiveModal,
  NgbModal,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { Constants } from "src/app/shared/constants/constants";
import { MyGatePasses } from "src/app/shared/models/dashboard/myGatePasses";
import { MyVisitors } from "src/app/shared/models/dashboard/myVisitors";
import { DrivingLicense } from "src/app/shared/models/gatepass/drivingLicense";
import { ResponsePostRequest } from "src/app/shared/models/gatepass/gate-pass-request";
import { Request2Get } from "src/app/shared/models/gatepass/request2Get";
import {
  VehicleMaker,
  VehicleModel,
} from "src/app/shared/models/gatepass/vehicle";
import { zColors } from "src/app/shared/models/zsk/zColors";
import { zOwnershipTypes } from "src/app/shared/models/zsk/zOwnershipTypes";
import { zPlateCode } from "src/app/shared/models/zsk/zPlateCode";
import { DateService } from "src/app/shared/services/date.service";
import { GatePassService } from "src/app/shared/services/gatepass.service";
import { ZskService } from "src/app/shared/services/zsk.service";
import { fileSizeValidator } from "src/app/shared/validators/filesize.validator";
import { requiredFileType } from "src/app/shared/validators/filetype.validator";

@Component({
  selector: "app-gate-pass-modal",
  templateUrl: "./gate-pass-modal.component.html",
  styleUrls: ["./gate-pass-modal.component.scss"],
})
export class GatePassModalComponent implements OnInit {
  @Input() inputData: {
    usersId?: number;
    isEdit?: boolean;
    isSecurity?: boolean;
    requestsId?: number;
  };

  requestData: Request2Get;
  modalTitle: string = "VIEWGATEPASS";
  licenseAttach: File;
  idCardAttach: File;
  personPhotoFile: File;
  ownershipCardAttach: File;
  registrationAttach: File;
  noObjectionAttach: File;
  rentalContractAttach: File;
  inputForm: FormGroup;
  @Output() updateSelectedRoles = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private gatePassService: GatePassService,

    private zskService: ZskService
  ) {}

  ngOnInit(): void {
    console.log(this.inputData);

    setTimeout(() => {
      if (this.inputData.requestsId == 0) {
        this.modalTitle = "NEWGATEPASS";
        this.requestData = {
          requestsId: this.inputData.requestsId,
          vehicleId: 0,
          usersId: this.inputData.usersId,
          user: {
            systemId: null,
            fullNameEn: null,
            fullNameAr: null,
            userName: null,
            departmentEn: null,
            departmentAr: null,
            mobile: null,
            img: null,
            email: null,
            designationEn: null,
            designationAr: null,
            zUserTypeId: null,
          },
          vehicle: {
            vehicleId: null,
            usersId: this.inputData.usersId,
            systemId: null,
            zMakerId: null,
            zMakerNameEn: null,
            zMakerNameAr: null,
            zModelId: null,
            year: null,
            plateNumber: null,
            zPlateCodeId: null,
            notes: null,
            owned: null,
            zOwnershipTypeId: null,
            zColorsId: null,
            registrationURL: null,
            registrationIssue: null,
            registrationExpairy: null,
            rentalContract: null,
            ownerIdCardURl: null,
            noObjectionLetter: null,
            isverified: null,
            colorClass: null,
            textColor: null,
          },
          drivingLicense: {
            drivingLicenseId: 0,
            usersId: this.inputData.usersId,
            licenseURL: null,
            expairyDate: null,
            isverified: null,
            notes: null,
          },
          zRequestsStatusId: 0,
          zRequestsStatusNameEn: null,
          zRequestsStatusNameAr: null,
          zRequestsTypesId: 0,
          zRequestsTypesNameEn: null,
          zRequestsTypesNameAr: null,
          notes: null,
        };

        // Promise.all([this.getDrivingLicenseData()]).then(() => this.initForm());
        // Promise.resolve([this.getDrivingLicenseData()]).then(()=> this.initForm());
        // this.initForm();

        this.getDrivingLicenseData();
      } else {
        this.gatePassService
          .getVisitRequestById(this.inputData.requestsId)
          .subscribe((data: Request2Get) => {
            this.requestData = data;
            console.log(data);

            this.initForm();
          });
      }
    }, 1);
  }
  getDrivingLicenseData() {
    // this.inputData.usersId = 4;
    return this.gatePassService
      .getDrivingLicense(this.inputData.usersId)
      .subscribe((data: DrivingLicense) => {
        if (data != null) {
          this.requestData.drivingLicense = data;
          this.initForm();
        } else {
          this.initForm();
        }
      });
  }
  initForm(): void {
    // console.log("Form");

    this.inputForm = this.fb.group({
      requestsId: [this.requestData.requestsId, Validators.required],
      usersId: [this.requestData.usersId, Validators.required],
      securitySide: this.fb.group({
        notes: [this.requestData.notes],
      }),
      isEdit: [this.inputData.isEdit],

      licenseDetails: this.fb.group({
        requestsId: [this.requestData.requestsId],
        drivingLicenseId: [
          this.requestData.drivingLicense.drivingLicenseId,
          [Validators.required],
        ],
        usersId: [this.requestData.drivingLicense.usersId, Validators.required],
        licenseURL: [this.requestData.drivingLicense.licenseURL],
        licenseAttach: [null],
        expairyDate: [
          this.requestData.drivingLicense.expairyDate == null
            ? null
            : this.ngbDateParserFormatter.parse(
                this.requestData.drivingLicense.expairyDate
              ),
          [Validators.required],
        ],
        // isverified: [this.requestData.drivingLicense.isverified],
        // notes: [this.requestData.drivingLicense.notes],
        isExpire: [true],
        securitySide: this.fb.group({
          notes: [
            this.requestData.drivingLicense.notes,
            this.requestData.drivingLicense.isverified == false &&
            this.inputData.isSecurity == true
              ? Validators.required
              : null,
          ],
          isverified: [this.requestData.drivingLicense.isverified],
        }),
        isEdit: [this.inputData.isEdit],
      }),

      vehicleDetails: this.fb.group({
        plateDetails: this.fb.group({
          plateNumber: [
            this.requestData.vehicle.plateNumber,
            Validators.required,
          ],
          zPlateCodeId: [
            this.requestData.vehicle.zPlateCodeId,
            Validators.required,
          ],
          isEdit: [this.inputData.isEdit],
        }),
        requestsId: [this.requestData.requestsId],
        vehicleId: [this.requestData.vehicle.vehicleId],
        usersId: [this.requestData.vehicle.usersId],
        zMakerId: [this.requestData.vehicle.zMakerId, [Validators.required]],

        zMakerNameEn: [this.requestData.vehicle.zMakerNameEn],
        zMakerNameAr: [this.requestData.vehicle.zMakerNameAr],

        zModelId: [this.requestData.vehicle.zModelId, [Validators.required]],

        zModelNameEn: [this.requestData.vehicle.zModelNameEn],
        zModelNameAr: [this.requestData.vehicle.zModelNameAr],

        year: [this.requestData.vehicle.year, [Validators.required]],
        owned: [this.requestData.vehicle.owned, [Validators.required]],
        zOwnershipTypeId: [
          this.requestData.vehicle.zOwnershipTypeId,
          [Validators.required],
        ],

        zOwnershipTypeNameEn: [this.requestData.vehicle.zOwnershipTypeNameEn],
        zOwnershipTypeNameAr: [this.requestData.vehicle.zOwnershipTypeNameAr],

        zPlateCodeNameEn: [this.requestData.vehicle.zPlateCodeNameEn],
        zPlateCodeNameAr: [this.requestData.vehicle.zPlateCodeNameAr],

        colorClass: [this.requestData.vehicle.colorClass],
        colorText: [this.requestData.vehicle.textColor],
        zColorsId: [this.requestData.vehicle.zColorsId, [Validators.required]],

        zColorsNameEn: [this.requestData.vehicle.zColorsNameEn],
        zColorsNameAr: [this.requestData.vehicle.zColorsNameAr],

        registrationURL: [this.requestData.vehicle.registrationURL],
        registrationAttach: [null],
        registrationIssue: [
          this.requestData.vehicle.registrationIssue == null
            ? null
            : this.ngbDateParserFormatter.parse(
                this.requestData.vehicle.registrationIssue
              ),
          [Validators.required],
        ],
        registrationExpairy: [
          this.requestData.vehicle.registrationExpairy == null
            ? null
            : this.ngbDateParserFormatter.parse(
                this.requestData.vehicle.registrationExpairy
              ),
          [Validators.required],
        ],
        isExpire: [true],
        rentalContract: [this.requestData.vehicle.rentalContract],
        rentalContractAttach: [null],
        ownerIdCardURl: [this.requestData.vehicle.ownerIdCardURl],
        ownershipCardAttach: [null],
        noObjectionLetter: [this.requestData.vehicle.noObjectionLetter],
        noObjectionAttach: [null],
        // isverified: [this.requestData.vehicle.isverified],
        // notes: [this.requestData.vehicle.notes],
        securitySide: this.fb.group({
          notes: [
            this.requestData.vehicle.notes,
            this.requestData.vehicle.isverified == false &&
            this.inputData.isSecurity == true
              ? Validators.required
              : null,
          ],
          isverified: [this.requestData.vehicle.isverified],
        }),
        isEdit: [this.inputData.isEdit],
      }),
    });
    // console.log(this.inputForm.value);

    // this.drivingLicenseDetails
    //   .get("isExpire")
    //   .setValue(this.dateService.checkExpiryDate(data.expairyDate));

    if (this.inputForm.value.requestsId != 0 && this.inputData.isEdit == true) {
      this.modalTitle = "EDITGATEPASS";
      this.licenseDetails.get("securitySide").disable();
      this.vehicleDetails.get("securitySide").disable();
      if (this.licenseDetails.get("securitySide.isverified").value == false) {
      } else {
        this.licenseDetails.get("securitySide").disable();
        this.licenseDetails.get("expairyDate").disable();
      }
      if (this.vehicleDetails.get("securitySide.isverified").value == false) {
        // this.vehicleDetails.enable();
        this.vehicleDetails.get("registrationIssue").enable();
        this.vehicleDetails.get("registrationExpairy").enable();
        this.vehicleDetails.get("registrationIssue").setValue(null);
        this.vehicleDetails.get("registrationExpairy").setValue(null);
        this.vehicleDetails.get("registrationURL").setValue(null);
        this.vehicleDetails.get("isExpire").setValue(true);

        this.vehicleDetails.get("zMakerId").disable();
        this.vehicleDetails.get("zModelId").disable();
        this.vehicleDetails.get("year").disable();
        // this.vehicleDetails.get("plateDetails").enable();
        this.vehicleDetails.get("plateDetails.plateNumber").disable();
        this.vehicleDetails.get("plateDetails.zPlateCodeId").disable();
        this.vehicleDetails.get("owned").disable();
        this.vehicleDetails.get("zOwnershipTypeId").disable();
        this.vehicleDetails.get("zColorsId").disable();
      } else {
        this.vehicleDetails.get("registrationIssue").disable();
        this.vehicleDetails.get("registrationExpairy").disable();
        this.vehicleDetails.get("zMakerId").disable();
        this.vehicleDetails.get("zModelId").disable();
        this.vehicleDetails.get("year").disable();
        this.vehicleDetails.get("plateDetails").enable();
        this.vehicleDetails.get("plateDetails.plateNumber").disable();
        this.vehicleDetails.get("plateDetails.zPlateCodeId").disable();
        this.vehicleDetails.get("owned").disable();
        this.vehicleDetails.get("zOwnershipTypeId").disable();
        this.vehicleDetails.get("zColorsId").disable();
      }
    }

    if (this.inputData.isSecurity == true) {
      this.modalTitle = "EDITGATEPASS";
      this.inputForm.disable();
      this.licenseDetails.get("securitySide").enable();
      this.vehicleDetails.get("securitySide").enable();
      this.inputForm.get("securitySide").enable();
    }

    this.licenseDetails
      .get("securitySide.isverified")
      .valueChanges.subscribe((isChecked: boolean) => {
        if (this.inputData.isSecurity == true) {
          if (isChecked == true) {
            this.licenseDetails.get("securitySide.notes").setValue(null);
            this.licenseDetails.get("securitySide.notes").setValidators(null);
          } else {
            this.licenseDetails
              .get("securitySide.notes")
              .setValidators([Validators.required]);
          }
          this.licenseDetails
            .get("securitySide.notes")
            .updateValueAndValidity();
        }
      });
    this.vehicleDetails
      .get("securitySide.isverified")
      .valueChanges.subscribe((isChecked: boolean) => {
        if (this.inputData.isSecurity == true) {
          if (isChecked == true) {
            this.vehicleDetails.get("securitySide.notes").setValue(null);
            this.vehicleDetails.get("securitySide.notes").setValidators(null);
          } else {
            this.vehicleDetails
              .get("securitySide.notes")
              .setValidators([Validators.required]);
          }
          this.vehicleDetails
            .get("securitySide.notes")
            .updateValueAndValidity();
        }
      });

    if (this.inputData.isEdit == false) {
      this.inputForm.disable();
    }

    this.vehicleDetails
      .get("zModelId")
      .valueChanges.subscribe((zModelId: number) => {
        if (zModelId) {
          this.getVehicleModelById().then((data: VehicleModel) => {
            this.vehicleDetails.get("zModelNameEn").setValue(data.nameEn);
            this.vehicleDetails.get("zModelNameAr").setValue(data.nameAr);
          });
        }
      });
    this.vehicleDetails
      .get("zMakerId")
      .valueChanges.subscribe((zMakerId: number) => {
        if (zMakerId) {
          this.getVehicleMakerById().then((data: VehicleMaker) => {
            this.vehicleDetails.get("zMakerNameEn").setValue(data.nameEn);
            this.vehicleDetails.get("zMakerNameAr").setValue(data.nameAr);
          });
        }
      });
    this.vehicleDetails
      .get("zColorsId")
      .valueChanges.subscribe((zMakerId: number) => {
        if (zMakerId) {
          this.getColorsById().then((data: zColors) => {
            this.vehicleDetails.get("zColorsNameEn").setValue(data.nameEn);
            this.vehicleDetails.get("zColorsNameAr").setValue(data.nameAr);
          });
        }
      });
    // this.vehicleDetails
    //   .get("zOwnershipTypeId")
    //   .valueChanges.subscribe((zOwnershipTypeId: number) => {
    //     if (zOwnershipTypeId) {
    //       this.getOwnershipTypesById().then((data: zOwnershipTypes) => {
    //         this.vehicleDetails
    //           .get("zOwnershipTypeNameEn")
    //           .setValue(data.nameEn);
    //         this.vehicleDetails
    //           .get("zOwnershipTypeNameAr")
    //           .setValue(data.nameAr);
    //       });
    //     }
    //   });
  }

  public get licenseDetails() {
    return this.inputForm.get("licenseDetails") as FormGroup;
  }
  public get vehicleDetails() {
    return this.inputForm.get("vehicleDetails") as FormGroup;
  }

  closeModal(): void {
    // modal.close();
    this.modal.close();
  }
  checkFileSize(files: FileList, controlName: string, isPDF: boolean) {
    // console.log(files);
    // console.log(controlName);
    // console.log(isPDF);

    if (isPDF == true) {
      if (files && files[0]) {
        this.inputForm.get(controlName).setValidators([
          requiredFileType(Constants.FILE_TYPE_PDF),
          //It's passes the file info and the maxsize of allowed data
          fileSizeValidator(files, Constants.MAX_SIZE_PDF),
        ]);
        this.inputForm.get(controlName).updateValueAndValidity();

        // this.scienceJoinForm.controls.attachementURlTemp.updateValueAndValidity();

        if (controlName === "licenseDetails.licenseAttach") {
          this.licenseAttach = files.item(0);
          // console.log(this.licenseAttach);
        }
      }
    }
  }

  viewAttachmentFile(data: any) {
    const file = new Blob([data], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }

  onSubmitSecurity() {
    // console.log("Here Outter");

    this.updateSelectedRoles.emit(true);
  }

  async getVehicleMakerById(): Promise<VehicleMaker> {
    return new Promise((resolve, reject) => {
      this.zskService
        .getZVehicleMakerById(this.vehicleDetails.get("zMakerId").value)
        .subscribe((data: VehicleMaker) => {
          resolve(data);
        });
    });
  }
  async getVehicleModelById(): Promise<VehicleModel> {
    return new Promise((resolve, reject) => {
      this.zskService
        .getZVehicleModelById(this.vehicleDetails.get("zModelId").value)
        .subscribe((data: VehicleModel) => {
          resolve(data);
        });
    });
  }
  async getOwnershipTypesById(): Promise<zOwnershipTypes> {
    return new Promise((resolve, reject) => {
      this.zskService
        .getzOwnershipTypesById(
          this.vehicleDetails.get("zOwnershipTypeId").value
        )
        .subscribe((data: zOwnershipTypes) => {
          resolve(data);
        });
    });
  }
  async getPlateCodeById(): Promise<zPlateCode> {
    return new Promise((resolve, reject) => {
      this.zskService
        .getZPlateCodeById(
          this.vehicleDetails.get("plateDetails.zPlateCodeId").value
        )
        .subscribe((data: zPlateCode) => {
          resolve(data);
        });
    });
  }
  async getColorsById(): Promise<zColors> {
    return new Promise((resolve, reject) => {
      this.zskService
        .getZColorsById(this.vehicleDetails.get("zColorsId").value)
        .subscribe((data: zColors) => {
          resolve(data);
        });
    });
  }

  async getSubmitData(data: ResponsePostRequest) {
    const [carModel, carMaker, zOwnershipTypes, zPlateCode] = await Promise.all(
      [
        this.getVehicleMakerById(),
        this.getVehicleModelById(),
        this.getOwnershipTypesById(),
        this.getPlateCodeById(),
      ]
    );
    return new Promise((resolve, reject) => {
      let backData: MyGatePasses;

      backData = {
        usersId: this.inputForm.get("usersId").value,
        requestsId: data.requestsId,
        vehicleId: this.vehicleDetails.get("vehicleId").value,
        plateNumber: this.vehicleDetails.get("plateDetails.plateNumber").value,
        year: this.ngbDateParserFormatter.parse(
          this.vehicleDetails.get("year").value
        ).year,
        zPlateCodeNameEn: zPlateCode.nameEn,
        zPlateCodeNameAr: zPlateCode.nameAr,
        zVehicleModelNameEn: carModel.nameEn,
        zVehicleModelNameAr: carModel.nameAr,
        zVehicleMakerNameEn: carMaker.nameEn,
        zVehicleMakerNameAr: carMaker.nameAr,
        zOwnershipTypeColorClass: zOwnershipTypes.colorClass,
        zOwnershipTypeTextColor: zOwnershipTypes.textColor,
        requestDate: new Date(),
        zRequestsStatusId: data.zRequestsStatusId,
        zRequestsStatusNameEn: data.zRequestsStatusNameEn,
        zRequestsStatusNameAr: data.zRequestsStatusNameAr,
        zRequestsStatusColorClass: data.colorClass,
      };
      // console.log(backData);
      resolve(backData);
    });
  }

  onSubmit(data: ResponsePostRequest): void {
    this.getSubmitData(data).then((backData: MyGatePasses) => {
      this.updateSelectedRoles.emit(backData);
    });
  }

  test() {
    console.log(this.inputForm);
  }
}
