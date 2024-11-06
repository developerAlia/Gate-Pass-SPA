import { zNationality } from "../../../models/zsk/zNationality";
import { Component, Input, OnInit, Self } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { ZskService } from "src/app/shared/services/zsk.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "nationality-autocomplete",
  templateUrl: "./nationality-autocomplete.component.html",
  styleUrls: ["./nationality-autocomplete.component.scss"],
})
export class NationalityAutoCompleteComponent implements OnInit, ControlValueAccessor {
  nationality: zNationality[] = [];

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
    this.getNationality();
  }

  getNationality() {
    this.zskService.getZNationality().subscribe((results) => {
      this.nationality = results;
    });
  }
}
