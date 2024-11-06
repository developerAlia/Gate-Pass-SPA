import { Component, Input, OnInit, Self } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "check-box",
  templateUrl: "./check-box.component.html",
  styleUrls: ["./check-box.component.scss"],
})
export class CheckBoxComponent implements OnInit, ControlValueAccessor {
  // @Input() isChecked;
  @Input() label = "VERIFIED";
  @Input() id = "gridCheck";
  constructor(
    public translate: TranslateService,
    @Self() public ngControl: NgControl
  ) {
    this.ngControl.valueAccessor = this;
  }
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  ngOnInit(): void {}
}
