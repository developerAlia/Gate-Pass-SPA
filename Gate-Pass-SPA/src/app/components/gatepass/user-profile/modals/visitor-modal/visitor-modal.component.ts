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
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ZskService } from "src/app/shared/services/zsk.service";
import { fileSizeValidator } from "src/app/shared/validators/filesize.validator";
import { requiredFileType } from "src/app/shared/validators/filetype.validator";
import { Constants } from "src/app/shared/constants/constants";
import { AuthService } from "src/app/auth/auth.service";
import { take } from "rxjs/operators";
import { Sys_userInfo } from "src/app/shared/models/sys/sys_userInfo";
import { Request2Get } from "src/app/shared/models/gatepass/request2Get";
import { GatePassService } from "src/app/shared/services/gatepass.service";
import { MyVisitors } from "src/app/shared/models/dashboard/myVisitors";
import { ResponsePostRequest } from "src/app/shared/models/gatepass/gate-pass-request";

@Component({
  selector: "visitor-modal",
  templateUrl: "./visitor-modal.component.html",
  styleUrls: ["./visitor-modal.component.scss"],
})
export class VisitorModalComponent implements OnInit {
  @Input() inputData: {
    usersId?: number;
    isOfficer?: boolean;
    isEdit?: boolean;
    isSecurity?: boolean;
    requestsId?: number;
  } = {
    // requestsId: 0
  };

  minDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };

  numberOfDays;

  @Output() updateSelectedRoles = new EventEmitter();
  inputForm: FormGroup;
  modalTitle: string;
  idCardAttach: File;
  licenseCardAttach: File;
  personPhotoFile: File;
  ownershipCardAttach: File;
  registrationAttach: File;
  noObjectionAttach: File;
  rentalContractAttach: File;
  tempURLImg: any;
  requestData: Request2Get;

  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal,
    private modalService: NgbModal,
    private toster: ToastrService,
    private cd: ChangeDetectorRef,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private authService: AuthService,
    private gatePassService: GatePassService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      // this.inputData.requestsId = 0;
      if (this.inputData.requestsId == 0) {
        this.requestData = {
          requestsId: this.inputData.requestsId,
          vehicleId: 0,
          visitDetailsId: 0,
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
            isOfficer: this.inputData.isOfficer,
          },
          vehicle: {
            vehicleId: 0,
            usersId: null,
            systemId: null,
            zMakerId: null,
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
            isverified: false,
          },
          visitDetails: {
            visitDetailsId: 0,
            dateFrom: null,
            dateTo: null,
            zVisitTypeId: null,
            zVisitTypeDayTo: 0,
            visitorId: 0,
            zRelationshipsId: null,
            visitor: {
              externalUsersId: 0,
              name: null,
              zGenderId: null,
              zNationalityId: null,
              phone: null,
              civilNumber: null,
              imgURl: null,
              civilIdExpairyDate: null,
              civilIdURL: null,
              isverified: false,
              notes: null,
              img: null,
            },
          },
          drivingLicense: {
            drivingLicenseId: 0,
            usersId: 0,
            licenseURL: null,
            expairyDate: null,
            isverified: false,
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
        this.authService.currentUser$
          .pipe(take(1))
          .subscribe((data: Sys_userInfo) => {
            // this.inputForm.get("isOfficer").setValue(data.isOfficer);
            this.requestData.user.isOfficer = data.isOfficer;
          }),
          // console.log("Here");

          (this.modalTitle = "NEWVISITOR"),
          this.initForm();
      } else if (
        this.inputData.requestsId != 0 &&
        this.inputData.isEdit == false
      ) {
        (this.modalTitle = "VIEWVISITOR"), this.getData();
      } else if (
        this.inputData.requestsId != 0 &&
        this.inputData.isSecurity == true
      ) {
        (this.modalTitle = "VIEWVISITOR"), this.getData();
      } else if (
        this.inputData.requestsId != 0 &&
        this.inputData.isEdit == true
      ) {
        (this.modalTitle = "EDITVISITOR"), this.getData();
      }
    }, 1);
  }
  getData() {
    this.gatePassService
      .getVisitRequestById(this.inputData.requestsId)
      .subscribe((data: Request2Get) => {
        // console.log(data);

        (this.requestData = data), console.log(data), this.initForm();
      });
  }

  initForm(): void {
    //  console.log(this.minDate);
    //  console.log(this.requestData);

    this.inputForm = this.fb.group({
      requestsId: [this.requestData?.requestsId, [Validators.required]],
      usersId: [this.requestData.usersId],
      visitDetailsId: [this.requestData.visitDetailsId],
      imgTemp: [null],
      isEdit: [this.inputData.isEdit],
      isOfficer: [this.requestData.user.isOfficer, [Validators.required]],
      securitySide: this.fb.group({
        notes: [this.requestData.notes],
      }),
      permitDates: this.fb.group({
        permitDateFrom: [
          this.requestData.visitDetails.dateFrom == null
            ? null
            : this.ngbDateParserFormatter.parse(
                this.requestData.visitDetails.dateFrom
              ),
          [Validators.required],
        ],
        permitDateTo: [
          this.requestData.visitDetails.dateTo == null
            ? null
            : this.ngbDateParserFormatter.parse(
                this.requestData.visitDetails.dateTo
              ),
          [Validators.required],
        ],
        zVisitTypeId: [
          this.requestData.visitDetails.zVisitTypeId,
          [Validators.required],
        ],
        zVisitTypeName: [null],
        zVisitTypeNameEn: [this.requestData.visitDetails.zVisitTypeNameEn],
        zVisitTypeNameAr: [this.requestData.visitDetails.zVisitTypeNameAr],
        isEdit: [this.inputData.isEdit],
      }),

      visitorDetails: this.fb.group({
        requestsId: [this.requestData?.requestsId],
        externalUsersId: [
          this.requestData.visitDetails.visitor.externalUsersId,
          [Validators.required],
        ],
        usersId: [
          this.requestData.visitDetails.visitorId,
          [Validators.required],
        ],
        name: [
          this.requestData.visitDetails.visitor.name,
          [Validators.required],
        ],
        zGenderId: [
          this.requestData.visitDetails.visitor.zGenderId,
          [Validators.required],
        ],
        zGenderNameEn: [this.requestData.visitDetails.visitor.zGenderNameEn],
        zGenderNameAr: [this.requestData.visitDetails.visitor.zGenderNameAr],
        civilNumber: [
          this.requestData.visitDetails.visitor.civilNumber,
          [Validators.required],
        ],
        phone: [
          this.requestData.visitDetails.visitor.phone,
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(8),
          ],
        ],
        zNationalityID: [
          this.requestData.visitDetails.visitor.zNationalityId,
          [Validators.required],
        ],
        zNationalityNameEn: [
          this.requestData.visitDetails.visitor.zNationalityNameEn,
        ],
        zNationalityNameAr: [
          this.requestData.visitDetails.visitor.zNationalityNameAr,
        ],
        zRelationshipId: [this.requestData.visitDetails?.zRelationshipsId],
        zRelationshipsNameEn: [
          this.requestData.visitDetails?.zRelationshipsNameEn,
        ],
        zRelationshipsNameAr: [
          this.requestData.visitDetails?.zRelationshipsNameAr,
        ],
        attachIdCard: [null],
        civilIdExpairyDate: [
          this.requestData.visitDetails.visitor.civilIdExpairyDate == null
            ? null
            : this.ngbDateParserFormatter.parse(
                this.requestData.visitDetails.visitor.civilIdExpairyDate
              ),
        ],
        civilIdURL: [this.requestData.visitDetails.visitor.civilIdURL],
        isCivilAttachRequired: [null],
        photoAttach: [null],
        isPhotoAttachRequired: [null],
        imgURL: [this.requestData.visitDetails.visitor.imgURl],
        numberOfDays: [this.requestData.visitDetails.zVisitTypeDayTo],
        isExpire: [true],

        isverified: [this.requestData.visitDetails.visitor.isverified],
        notes: [this.requestData.visitDetails.visitor.notes],
        securitySide: this.fb.group({
          notes: [this.requestData.visitDetails.visitor.notes],
          isverified: [this.requestData.visitDetails.visitor.isverified],
        }),
        isEdit: [this.inputData.isEdit],
      }),

      drivingLicenseDetails: this.fb.group({
        // haveVehicle: [false],
        // expiryDate: [null],
        requestsId: [this.requestData?.requestsId],
        isExpire: [true],
        licenseAttach: [null],

        drivingLicenseId: [this.requestData.drivingLicense?.drivingLicenseId],
        usersId: [this.requestData.drivingLicense?.usersId],
        licenseURL: [this.requestData.drivingLicense?.licenseURL],
        expairyDate: [
          this.requestData.drivingLicense?.expairyDate == null
            ? null
            : this.ngbDateParserFormatter.parse(
                this.requestData.drivingLicense?.expairyDate
              ),
        ],
        isverified: [this.requestData.drivingLicense?.isverified],
        notes: [this.requestData.drivingLicense?.notes],

        securitySide: this.fb.group({
          notes: [this.requestData.drivingLicense?.notes],
          isverified: [this.requestData.drivingLicense?.isverified],
        }),
        isEdit: [this.inputData.isEdit],
      }),
      vehicleDetails: this.fb.group({
        isEdit: [this.inputData.isEdit],
        requestsId: [this.requestData?.requestsId],
        vehicleId: [this.requestData.vehicle?.vehicleId],
        zMakerId: [this.requestData.vehicle?.zMakerId],
        zMakerNameEn: [this.requestData.vehicle?.zMakerNameEn],
        zMakerNameAr: [this.requestData.vehicle?.zMakerNameAr],
        zModelId: [this.requestData.vehicle?.zModelId],
        zModelNameEn: [this.requestData.vehicle?.zModelNameEn],
        zModelNameAr: [this.requestData.vehicle?.zModelNameAr],
        year: [this.requestData.vehicle?.year],
        plateNumber: [this.requestData.vehicle?.plateNumber],
        zPlateCodeId: [this.requestData.vehicle?.zPlateCodeId],
        zPlateCodeNameAr: [this.requestData.vehicle?.zPlateCodeNameAr],
        zPlateCodeNameEn: [this.requestData.vehicle?.zPlateCodeNameEn],
        colorClass: [this.requestData.vehicle?.colorClass],
        colorText: [this.requestData.vehicle?.textColor],
        zColorsId: [this.requestData.vehicle?.zColorsId],
        zColorsNameEn: [this.requestData.vehicle?.zColorsNameEn],
        zColorsNameAr: [this.requestData.vehicle?.zColorsNameAr],
        registrationURL: [this.requestData.vehicle?.registrationURL],
        registrationAttach: [null],
        registrationIssue: [
          this.requestData.vehicle?.registrationIssue == null
            ? null
            : this.ngbDateParserFormatter.parse(
                this.requestData.vehicle?.registrationIssue
              ),
        ],
        registrationExpairy: [
          this.requestData.vehicle?.registrationExpairy == null
            ? null
            : this.ngbDateParserFormatter.parse(
                this.requestData.vehicle?.registrationExpairy
              ),
        ],
        rentalContract: [this.requestData.vehicle?.rentalContract],
        rentalContractAttach: [null],
        ownerIdCardURl: [this.requestData.vehicle?.ownerIdCardURl],
        ownershipCardAttach: [null],
        noObjectionAttach: [null],
        noObjectionLetter: [this.requestData.vehicle?.noObjectionLetter],
        note: [this.requestData.vehicle?.notes],
        owned: [this.requestData.vehicle?.owned],
        zOwnershipTypeId: [this.requestData.vehicle?.zOwnershipTypeId],
        zOwnershipTypeNameEn: [this.requestData.vehicle?.zOwnershipTypeNameEn],
        zOwnershipTypeNameAr: [this.requestData.vehicle?.zOwnershipTypeNameAr],
        isExpire: [true],

        securitySide: this.fb.group({
          notes: [this.requestData.vehicle?.notes],
          isverified: [this.requestData.vehicle?.isverified],
        }),
      }),
    });
    //  console.log(this.inputForm.value);

    if (this.inputData.isSecurity == true) {
      this.inputForm.disable();
      this.visitorDetails.get("securitySide.isverified").enable();
      this.visitorDetails.get("securitySide.notes").enable();
      if (this.visitorDetails.get("securitySide.isverified").value == false) {
        this.visitorDetails
          .get("securitySide.notes")
          .setValidators([Validators.required]);
        this.visitorDetails.get("securitySide.notes").updateValueAndValidity();
      }

      this.drivingLicenseDetails.get("securitySide.isverified").enable();
      this.drivingLicenseDetails.get("securitySide.notes").enable();
      if (
        this.drivingLicenseDetails.get("securitySide.isverified").value == false
      ) {
        this.drivingLicenseDetails
          .get("securitySide.notes")
          .setValidators([Validators.required]);
        this.drivingLicenseDetails
          .get("securitySide.notes")
          .updateValueAndValidity();
      }
      this.vehicleDetails.get("securitySide.isverified").enable();
      this.vehicleDetails.get("securitySide.notes").enable();
      if (this.vehicleDetails.get("securitySide.isverified").value == false) {
        this.vehicleDetails
          .get("securitySide.notes")
          .setValidators([Validators.required]);
        this.vehicleDetails.get("securitySide.notes").updateValueAndValidity();
      }

      this.inputForm.get("securitySide.notes").enable();
    } else if (this.inputData.isEdit == false) {
      this.inputForm.disable();
    } else if (
      this.inputForm.value.requestsId != 0 &&
      this.inputData.isEdit == true
    ) {
      this.permitDates.disable();
      this.inputForm.get("securitySide").disable();
      this.permitDates.get("isEdit").enable();
      if (this.visitorDetails.get("securitySide.isverified").value == false) {
        this.visitorDetails.disable();
        this.visitorDetails.get("civilIdExpairyDate").enable();
        this.visitorDetails.get("securitySide").disable();
        this.visitorDetails.get("isEdit").enable();
      } else {
        this.visitorDetails.disable();
        this.visitorDetails.get("isEdit").enable();
      }
      if (this.vehicleDetails.get("securitySide.isverified").value == false) {
        this.vehicleDetails.disable();
        this.vehicleDetails.get("registrationIssue").enable();
        this.vehicleDetails.get("registrationExpairy").enable();
        this.vehicleDetails.get("registrationAttach").enable();
        this.vehicleDetails.get("registrationIssue").setValue(null);
        this.vehicleDetails.get("registrationExpairy").setValue(null);
        this.vehicleDetails.get("registrationURL").setValue(null);
        this.vehicleDetails.get("isExpire").setValue(true);
        this.vehicleDetails.get("securitySide").disable();
        this.vehicleDetails.get("isEdit").enable();
      } else {
        this.vehicleDetails.disable();
        this.vehicleDetails.get("isEdit").enable();
      }
      if (
        this.drivingLicenseDetails.get("securitySide.isverified").value == false
      ) {
        this.drivingLicenseDetails.enable();
        this.drivingLicenseDetails.get("securitySide").disable();

        this.drivingLicenseDetails.get("isExpire").setValue(true);
        this.drivingLicenseDetails.get("licenseURL").setValue(null);
      } else {
        this.drivingLicenseDetails.disable();
        this.drivingLicenseDetails.get("isEdit").enable();
      }
    }
  }

  assignNumOfDays(data: any) {
    // console.log(data);
    this.numberOfDays = data;
  }

  public get permitDates() {
    return this.inputForm.get("permitDates") as FormGroup;
  }
  public get visitorDetails() {
    return this.inputForm.get("visitorDetails") as FormGroup;
  }

  public get drivingLicenseDetails() {
    return this.inputForm.get("drivingLicenseDetails") as FormGroup;
  }
  public get vehicleDetails() {
    return this.inputForm.get("vehicleDetails") as FormGroup;
  }

  testData() {
    // console.log(this.inputForm);
    //  console.log(this.drivingLicenseDetails);
  }

  test(): void {
    const test = {
      id: 1,
      name: "eyad",
    };
    this.updateSelectedRoles.emit(test);
  }

  closeModal(): void {
    // modal.close();
    this.modal.close();
  }

  test123(test) {
    // console.log(test);
  }

  checkFileSize(files: FileList, controlName: string, isPDF: boolean) {
    //  console.log(files);
    //  console.log(controlName);
    //  console.log(isPDF);

    if (isPDF == false) {
      if (files && files[0]) {
        this.inputForm.get(controlName).setValidators([
          Validators.required,
          requiredFileType(Constants.FILE_TYPE_PHOTO),
          //It's passes the file info and the maxsize of allowed data
          fileSizeValidator(files, Constants.MAX_SIZE_IMG),
        ]);
        this.personPhotoFile = files.item(0);
        this.inputForm.get(controlName).updateValueAndValidity();
        //To read the Image and convert it to Base64
        let reader = new FileReader();
        reader.readAsDataURL(files[0]); // read file as data url
        reader.onload = (event) => {
          // called once readAsDataURL is completed
          // It will be set to Base64
          let temp = event.target.result.toString().split(",")[1];
          if (controlName === "visitorDetails.photoAttach") {
            this.tempURLImg = temp;
            //  console.log(temp);
          }
        };
      }
    } else {
      if (files && files[0]) {
        this.inputForm.get(controlName).setValidators([
          requiredFileType(Constants.FILE_TYPE_PDF),
          //It's passes the file info and the maxsize of allowed data
          fileSizeValidator(files, Constants.MAX_SIZE_PDF),
        ]);
        this.inputForm.get(controlName).updateValueAndValidity();

        // this.scienceJoinForm.controls.attachementURlTemp.updateValueAndValidity();

        if (controlName === "visitorDetails.attachIdCard") {
          this.idCardAttach = files.item(0);
          //  console.log(this.idCardAttach);
        } else if (controlName === "drivingLicenseDetails.licenseAttach") {
          this.licenseCardAttach = files.item(0);
          //  console.log(this.licenseCardAttach);
        } else if (controlName === "vehicleDetails.ownershipCardAttach") {
          this.ownershipCardAttach = files.item(0);
          //   console.log(this.ownershipCardAttach);
        } else if (controlName === "vehicleDetails.registrationAttach") {
          this.registrationAttach = files.item(0);
          //   console.log(this.registrationAttach);
        } else if (controlName === "vehicleDetails.noObjectionAttach") {
          this.noObjectionAttach = files.item(0);
          //   console.log(this.noObjectionAttach);
        } else if (controlName === "vehicleDetails.rentalContractAttach") {
          this.rentalContractAttach = files.item(0);
          //   console.log(this.rentalContractAttach);
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
    this.updateSelectedRoles.emit(true);
  }

  onSubmit(data: ResponsePostRequest): void {
    const backData: MyVisitors = {
      visitorId: 0,
      requestsId: data.requestsId,
      visitorName: this.visitorDetails.get("name").value,
      requestDate: new Date(),
      zRequestsStatusId: data.zRequestsStatusId,
      zRequestsStatusNameEn: data.zRequestsStatusNameEn,
      zRequestsStatusNameAr: data.zRequestsStatusNameAr,
      zRequestsStatusColorClass: data.colorClass,
    };

    this.updateSelectedRoles.emit(backData);
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }
}
