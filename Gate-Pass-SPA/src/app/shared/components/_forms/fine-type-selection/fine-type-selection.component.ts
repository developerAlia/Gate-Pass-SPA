import { Component, OnInit, Self } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { zFineType } from "src/app/shared/models/zsk/zFineType";
import { ZskService } from "src/app/shared/services/zsk.service";

@Component({
  selector: "fine-type-selection",
  templateUrl: "./fine-type-selection.component.html",
  styleUrls: ["./fine-type-selection.component.scss"],
})
export class FineTypeSelectionComponent
  implements OnInit, ControlValueAccessor
{
  fineType: zFineType[] = [];

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
    this.zskService.getZFineType().subscribe((results: zFineType[]) => {
      this.fineType = results;
    });
  }
}
