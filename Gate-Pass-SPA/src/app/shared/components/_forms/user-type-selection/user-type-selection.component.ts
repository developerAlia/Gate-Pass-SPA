import { Component, OnInit, Self } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { zUserType } from "src/app/shared/models/zsk/zUserType";
import { ZskService } from "src/app/shared/services/zsk.service";

@Component({
  selector: "user-type-selection",
  templateUrl: "./user-type-selection.component.html",
  styleUrls: ["./user-type-selection.component.scss"],
})
export class UserTypeSelectionComponent
  implements OnInit, ControlValueAccessor
{
  zUserType: zUserType[] = [];

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
    this.getData();
  }

  getData() {
    this.zskService.getzUserType().subscribe((data: zUserType[]) => {
      this.zUserType = data;
    });
  }
}
