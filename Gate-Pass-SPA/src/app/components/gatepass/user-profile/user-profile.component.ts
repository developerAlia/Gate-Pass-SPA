import { DrivingLicense } from "./../../../shared/models/gatepass/drivingLicense";
import { GatePassService } from "../../../shared/services/gatepass.service";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { HrmsService } from "src/app/shared/services/hrms.service";
import { HrmsInfo } from "src/app/shared/models/hrms/hrmsInfo";
import { AuthService } from "src/app/auth/auth.service";
import { DrivinglicenseComponent } from "./../drivinglicense/drivinglicense.component";
import { Component, OnInit } from "@angular/core";
import {
  NgbDateParserFormatter,
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { GatepassmodalComponent } from "../gatepassmodal/gatepassmodal.component";
import { take } from "rxjs/operators";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Sys_userInfo } from "src/app/shared/models/sys/sys_userInfo";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  modals: NgbModalRef;
  usersId: number;
  hrmsInfo: HrmsInfo;
  expireyDate: string;
  todaysDate: string;
  sysUserInfo: Sys_userInfo;
  zuserTypeId;
  LicenseExists: boolean;
  isOfficer: boolean;
  language = localStorage.getItem("selectedLanguage");
  constructor(
    private modalService: NgbModal,
    private authServices: AuthService,
    private hrmsService: HrmsService,
    private gatePassServices: GatePassService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    this.authServices.currentUser$.pipe(take(1)).subscribe((user) => {
      this.sysUserInfo = user;
      // console.log(this.sysUserInfo);

      if (
        this.sysUserInfo.roles.find((e) => e !== "Admin" && e !== "SysAdmin") ==
        true
      ) {
        this.usersId = this.sysUserInfo.usersId;
      } else {
        this.usersId = this.route.snapshot.params.id;
        // console.log(this.researchId);
      }
      // this.researchId = this.sysUserInfo.researcherId;
      // this.usersId = this.sysUserInfo.usersId;
      this.zuserTypeId = this.sysUserInfo.zUserTypeId;
    }),
      this.getUserProfile(),
      this.checkExpireyDate(),
      this.checkIfLicenseExisits(),
      (this.language = localStorage.getItem("selectedLanguage"));

    // this.authServices.currentUser$.pipe(take(1)).subscribe((user) => {
    //   this.usersId = user.usersId;
    // }),
    //   this.checkExpireyDate(),
    //   this.checkIfLicenseExisits(),
    //   this.getUserProfile(),
    //   (this.language = localStorage.getItem("selectedLanguage"));
  }
  checkIfLicenseExisits() {
    // this.gatePassServices.checkIfLicenseExists().subscribe((resp) => {
    //   if (resp == true) {
    //     this.LicenseExists = true;
    //   } else {
    //     this.LicenseExists = false;
    //   }
    //   if (this.expireyDate >= this.todaysDate) {
    //     this.LicenseExists = true;
    //   } else {
    //     this.LicenseExists = false;
    //   }
    // });
  }

  getUserProfile() {
    this.gatePassServices
      .getUserById(this.usersId)
      .subscribe((user: HrmsInfo) => {
        this.hrmsInfo = user;
        this.isOfficer = user.isOfficer;
        // console.log(this.isOfficer);
      });
    // this.hrmsService
    //   .getHrmsInfo(this.gatPassUserId)
    //   .subscribe((user: HrmsInfo) => {
    //     this.hrmsInfo = user;
    //   });
  }
  newGatePassModal() {
    this.modals = this.modalService.open(GatepassmodalComponent, {
      centered: true,
      backdrop: true,
      size: "xl",
    });
  }
  newDrivingLicense() {
    this.modals = this.modalService.open(DrivinglicenseComponent, {
      centered: true,
      backdrop: true,
      size: "xl",
    });
  }

  checkExpireyDate() {
    // this.gatePassServices
    //   .checkLicenseExpireydate()
    //   .subscribe((license: DrivingLicense) => {
    //     if (license) {
    //       this.expireyDate = license.expairyDate;
    //       this.todaysDate = license.todayDate;
    //     } else {
    //       this.expireyDate = null;
    //       this.todaysDate = null;
    //     }
    //   });
  }
}
