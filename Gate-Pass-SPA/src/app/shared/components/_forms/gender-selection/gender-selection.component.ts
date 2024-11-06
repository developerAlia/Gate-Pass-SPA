import { Component, Input, OnInit, Self } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { zGender } from "src/app/shared/models/zsk/zGender";
import { ZskService } from "src/app/shared/services/zsk.service";

@Component({
  selector: "app-gender-selection",
  templateUrl: "./gender-selection.component.html",
  styleUrls: ["./gender-selection.component.scss"],
})
export class GenderSelectionComponent implements OnInit, ControlValueAccessor {
  gender: zGender[] = [];

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
    this.getGender();
  }

  getGender() {
    this.zskService.getZGender().subscribe((results) => {
      this.gender = results;
    });
  }
}
