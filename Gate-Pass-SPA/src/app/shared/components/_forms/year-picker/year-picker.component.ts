import { Component, Input, OnInit, Self } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "year-picker",
  templateUrl: "./year-picker.component.html",
  styleUrls: ["./year-picker.component.scss"],
})
export class YearPickerComponent implements OnInit, ControlValueAccessor {
  @Input() label = "yyyy";
  @Input() readonlyStatus = true;
  @Input() isRequired = true;
  @Input() yearData;
  constructor(
    @Self() public ngControl: NgControl,
    public translate: TranslateService
  ) {
    this.ngControl.valueAccessor = this;
  }
  ngOnInit(): void {}
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
}
