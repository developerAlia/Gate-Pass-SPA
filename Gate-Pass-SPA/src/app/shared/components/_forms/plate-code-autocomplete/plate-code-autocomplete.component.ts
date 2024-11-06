import { zPlateCode } from "../../../models/zsk/zPlateCode";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { Component, Input, OnInit, Self } from "@angular/core";
import { ZskService } from "src/app/shared/services/zsk.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-plate-code-autocomplete",
  templateUrl: "./plate-code-autocomplete.component.html",
  styleUrls: ["./plate-code-autocomplete.component.scss"],
})
export class PlateCodeAutocompleteComponent
  implements OnInit, ControlValueAccessor
{
  plateCode: zPlateCode[] = [];
  // @Input() selectedId;

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
    this.getPlateCode();
  }

  getPlateCode() {
    this.zskService.getZPlateCode().subscribe((results) => {
      this.plateCode = results;
    });
  }
}
