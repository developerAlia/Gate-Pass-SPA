import { Component, Input, OnInit, Self } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { zPlateCode } from "src/app/shared/models/zsk/zPlateCode";
import { zVisitType } from "src/app/shared/models/zsk/zVisitType";
import { ZskService } from "src/app/shared/services/zsk.service";

@Component({
  selector: "visit-type",
  templateUrl: "./visit-type.component.html",
  styleUrls: ["./visit-type.component.scss"],
})
export class VisitTypeComponent implements OnInit, ControlValueAccessor {
  visitType: zVisitType[] = [];
  @Input() isOfficer: boolean = false;

  constructor(
    private zskService: ZskService,
    public translate: TranslateService,
    @Self() public ngControl: NgControl
  ) {
    this.ngControl.valueAccessor = this;
  }
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
  ngOnInit(): void {
    this.getVisitPurpose();
  }

  getVisitPurpose() {
    this.zskService.getzVisitType(this.isOfficer).subscribe((results) => {
      this.visitType = results;

      // this.visitType.map((e) => {
      //   e.nameFull =
      //     this.translate.currentLang == "en"
      //       ? e.nameEn + " (" + e.dayTo + " "+ this.translate.instant('DAY') + ")"
      //       : e.nameAr + " (" + e.dayTo + " "+ this.translate.instant('DAY') + ")";
      // });
    });
  }
}
