import { ToastService } from "./../../../shared/services/toast.service";
import {
  VehicleMaker,
} from "./../../../shared/models/gatepass/vehicle";
import { GatePassService } from "../../../shared/services/gatepass.service";
import { Component, Input, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  NgbActiveModal,
  NgbDateParserFormatter,
  NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";
import { fileSizeValidator } from "src/app/shared/validators/filesize.validator";
import { requiredFileType } from "src/app/shared/validators/filetype.validator";
import { Constants } from "src/app/shared/constants/constants";
import { ZskService } from "src/app/shared/services/zsk.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-gatepassmodal",
  templateUrl: "./gatepassmodal.component.html",
  styleUrls: ["./gatepassmodal.component.scss"],
})
export class GatepassmodalComponent implements OnInit {

  @Input() inputData: {
    gatePassUsersId: number;
  } = { gatePassUsersId: 0 };

  zVehicleMaker: VehicleMaker[];
  isChecked: boolean = false;
  gatePassReqeustId: any;
  ownVehicle = "";
  modelFooter: NgbDateStruct;
  // getVehicle: GetVehicle;
  language = localStorage.getItem("selectedLanguage");
  secondFormGroup: FormGroup;
  gatePassForm: FormGroup;

  vehicleRegFrontAttach: File;
  vehicleRegBackAttach: File;
  noObjectionAttach: File;
  ownerIdAttach: File;
  rentalContract: File;

  iscommercial = false;
  commercial = false;
  ownerShipType = "";
  isLinear = false;
  isPicked = false;
  constructor(
    private fb: FormBuilder,
    private gatepass: GatePassService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private tostr: ToastService,
    private modal: NgbActiveModal,
    private zskService: ZskService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.initForm();
      // this.fillZskData();
      // this.toggledSwitchOwnVehicle(this.isChecked);
    }, 1);
  }

  // fillZskData() {
  //   this.zskService.getVehicleMaker().subscribe((data: VehicleMaker[]) => {
  //     this.zVehicleMaker = data;
  //   });
  // }

  initForm() {
    this.secondFormGroup = this.fb.group({
      zVehicleModelId: [
        {
          value: null,
          disabled: true,
        },
        Validators.required,
      ],
      Note: ["", Validators.required],
      zOwnershipTypeId: ["", Validators.required],
      plateNumber: ["", Validators.required],
      zPlateCodeId: ["", Validators.required],
      Year: ["", Validators.required],
      zColorsId: [null, Validators.required],
      regIssueDate: [null, Validators.required],
      regExpireDate: [null, Validators.required],
      vehicleRegFrontAttach: [null, Validators.required],
      vehicleRegBackAttach: [null, Validators.required],
      // VehicleRegistrationExpairy: [null, Validators.required],
      carmaker: [null, Validators.required],
      ownVehicleSlider: [false, Validators.required],
      ownershipTypeSlider: [false, Validators.required],

      vehicleDetails: this.fb.group({
        zCarMakerId: [null, Validators.required],
        zVehicleModelId: [1, Validators.required],
        zColorsId: [null, Validators.required],
        plateNumber: [null, Validators.required],
        zPlateCodeId: [null, Validators.required],
        Year: [null, Validators.required],
      }),
      noObjectionAttach: [null],
      ownerIdAttach: [null],
      rentalContract: [null],
    });
    this.secondFormGroup
      .get("ownershipTypeSlider")
      .valueChanges.subscribe((IsCommercial: boolean) => {
        if (IsCommercial == true) {
          this.secondFormGroup.get("zOwnershipTypeId").setValue(2);
          this.secondFormGroup.get("noObjectionAttach").setValidators([Validators.required]);
          this.secondFormGroup.get("ownerIdAttach").setValidators([Validators.required]);
          this.secondFormGroup.get("rentalContract").setValidators([Validators.required]);
          this.secondFormGroup.get("noObjectionAttach").updateValueAndValidity();
          this.secondFormGroup.get("ownerIdAttach").updateValueAndValidity();
          this.secondFormGroup.get("rentalContract").updateValueAndValidity();
        } else {
          this.secondFormGroup.get("zOwnershipTypeId").setValue(1);
          this.secondFormGroup.get("noObjectionAttach").setValidators(null);
          this.secondFormGroup.get("ownerIdAttach").setValidators(null);
          this.secondFormGroup.get("rentalContract").setValidators(null);
          this.secondFormGroup.get("noObjectionAttach").updateValueAndValidity();
          this.secondFormGroup.get("ownerIdAttach").updateValueAndValidity();
          this.secondFormGroup.get("rentalContract").updateValueAndValidity();

          this.noObjectionAttach = null;
          this.ownerIdAttach = null;
          this.rentalContract = null;

        }
      });
  }

  public get vehicleDetails() {
    return this.secondFormGroup.get("vehicleDetails") as FormGroup;
  }

  onSubmit() {
    this.secondFormGroup
      .get("VehicleRegistrationIssue")
      .setValue(
        this.ngbDateParserFormatter.format(
          this.secondFormGroup.get("VehicleRegistrationIssue").value
        )
      );
    this.secondFormGroup
      .get("VehicleRegistrationExpairy")
      .setValue(
        this.ngbDateParserFormatter.format(
          this.secondFormGroup.get("VehicleRegistrationExpairy").value
        )
      );
    // this.gatepass
    //   .postGatePass(this.secondFormGroup.value)
    //   .subscribe((result) => {
    //     this.tostr.toastrService.success("تم ارسال طلب التصريح");
    //     console.log(result);
    //       this.gatePassReqeustId = result;
    //   });
    console.log(this.secondFormGroup.value);
  }

  checkFileSize(files: FileList, controlName: string) {
    if (files && files[0]) {
      this.secondFormGroup.get(controlName).setValidators([
        requiredFileType(Constants.FILE_TYPE_PDF),
        //It's passes the file info and the maxsize of allowed data
        fileSizeValidator(files, Constants.MAX_SIZE_PDF),
      ]);
      this.secondFormGroup.get(controlName).updateValueAndValidity();

      // this.scienceJoinForm.controls.attachementURlTemp.updateValueAndValidity();

      if (controlName === "vehicleRegFrontAttach") {
        this.vehicleRegFrontAttach = files.item(0);
      }
      else if (controlName === "vehicleRegBackAttach") {
        this.vehicleRegBackAttach = files.item(0);
      }
      else if (controlName === "noObjectionAttach") {
        this.vehicleRegBackAttach = files.item(0);
      }
      else if (controlName === "ownerIdAttach") {
        this.ownerIdAttach = files.item(0);
      }
      else if (controlName === "rentalContract") {
        this.rentalContract = files.item(0);
      }
    }
  }

  test() {
    console.log(this.secondFormGroup);
  }

  closeModal(): void {
    // modal.close();
    this.modal.close();
  }
}
