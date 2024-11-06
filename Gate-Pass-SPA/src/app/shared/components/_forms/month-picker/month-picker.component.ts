import { Component, Input, OnInit, Self } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "month-picker",
  templateUrl: "./month-picker.component.html",
  styleUrls: ["./month-picker.component.scss"],
})
export class MonthPickerComponent implements OnInit, ControlValueAccessor {
  @Input() label = "yyyy-mm";
  @Input() readonlyStatus = true;
  @Input() isRequired = true;
  @Input() monthData;
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
