import { Router } from "@angular/router";
import {
  DrivingLicense,
  DrivingLicenseAttach,
} from "./../../../shared/models/gatepass/drivingLicense";
import { ToastrService } from "ngx-toastr";
import { GatePassService } from "../../../shared/services/gatepass.service";
import {
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { requiredFileType } from "src/app/shared/validators/filetype.validator";
import { fileSizeValidator } from "src/app/shared/validators/filesize.validator";
const FILE_TYPE_PDF = ["pdf"];
const MAX_SIZE = 5000;
@Component({
  selector: "app-drivinglicense",
  templateUrl: "./drivinglicense.component.html",
  styleUrls: ["./drivinglicense.component.scss"],
})
export class DrivinglicenseComponent implements OnInit {
  drivingLicenseGroup = this.fb.group({
    drivingLicensesIssueDate: ["", Validators.required],
    drivingLicensesExpairyDate: ["", Validators.required],
    drivingLicenseFile: ["", Validators.required],
  });
  url: string;
  drivinglicens: DrivingLicense;
  tempFileToUpload: File;
  tempFileToUploadPDF: File;
  tempURLImg: any;
  now = new Date();

  constructor(
    private fb: FormBuilder,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private gatePassServices: GatePassService,
    private tostr: ToastrService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}
  onSubmit() {
    this.drivingLicenseGroup
      .get("drivingLicensesIssueDate")
      .setValue(
        this.ngbDateParserFormatter.format(
          this.drivingLicenseGroup.get("drivingLicensesIssueDate").value
        )
      );
    this.drivingLicenseGroup
      .get("drivingLicensesExpairyDate")
      .setValue(
        this.ngbDateParserFormatter.format(
          this.drivingLicenseGroup.get("drivingLicensesExpairyDate").value
        )
      );

    this.gatePassServices
      .postDrivingLicenseDate(this.drivingLicenseGroup.value)
      .subscribe(() => {
        if (localStorage.getItem("selectedLanguage") == '"en"') {
          this.tostr.success("Record added  Successfuly");
        } else {
          this.tostr.success("تم حفظ البيانات");
        }
        this.closeModal();
      });

    this.postAttachment();
  }

  checkFileSize(files: FileList, isPDF?: boolean) {
    if (isPDF == false) {
      if (files && files[0]) {
        this.drivingLicenseGroup.controls.logoUrlTemp.setValidators([
          Validators.required,
          requiredFileType(FILE_TYPE_PDF),
          //It's passes the file info and the maxsize of allowed data
          fileSizeValidator(files, MAX_SIZE),
        ]);
        this.tempFileToUpload = files.item(0);
        this.drivingLicenseGroup.controls.logoUrlTemp.updateValueAndValidity();
        //To read the Image and convert it to Base64
        let reader = new FileReader();
        reader.readAsDataURL(files[0]); // read file as data url
        reader.onload = (event) => {
          // called once readAsDataURL is completed
          // It will be set to Base64
          let temp = event.target.result.toString().split(",")[1];
          this.tempURLImg = temp;
        };
      }
    } else {
      if (files && files[0]) {
        if (this.drivingLicenseGroup.value.competitionId == 0) {
          this.drivingLicenseGroup.controls.drivingLicenseFile.setValidators([
            Validators.required,
            requiredFileType(FILE_TYPE_PDF),
            //It's passes the file info and the maxsize of allowed data
            fileSizeValidator(files, MAX_SIZE),
          ]);
        } else {
          this.drivingLicenseGroup.controls.drivingLicenseFile.setValidators([
            requiredFileType(FILE_TYPE_PDF),
            //It's passes the file info and the maxsize of allowed data
            fileSizeValidator(files, MAX_SIZE),
          ]);
        }
        this.tempFileToUploadPDF = files.item(0);

        this.drivingLicenseGroup.controls.drivingLicenseFile.updateValueAndValidity();
      }
    }
  }

  postAttachment() {
    // if (this.tempFileToUploadPDF) {
    //   const pdfData: DrivingLicenseAttach = {
    //     drivingLicenseFile: this.tempFileToUploadPDF,
    //   };
    //   this.gatePassServices.attachDrivingLicense(pdfData).subscribe(() => {
    //     if (localStorage.getItem("selectedLanguage") == '"en"') {
    //       this.tostr.success("File Uploaded Successfully");
    //     } else {
    //       this.tostr.success("تم رفع الملف");
    //     }
    //   });

    //   this.reload();
    // }
  }

  reload() {
    this.url = this.router.url.toString();
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([`/${this.url}`]).then(() => {});
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
