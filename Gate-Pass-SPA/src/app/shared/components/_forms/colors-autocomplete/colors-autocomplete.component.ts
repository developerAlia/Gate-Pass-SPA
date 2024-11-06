import { zColors } from "../../../models/zsk/zColors";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { Component, Input, OnInit, Self } from "@angular/core";
import { ZskService } from "src/app/shared/services/zsk.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-colors-autocomplete",
  templateUrl: "./colors-autocomplete.component.html",
  styleUrls: ["./colors-autocomplete.component.scss"],
})
export class ColorsAutocompleteComponent
  implements OnInit, ControlValueAccessor
{
  colors: zColors[] = [];
  @Input() selectedId = null;
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
    this.getColors();
  }

  getColors() {
    this.zskService.getZColors().subscribe((results) => {
      this.colors = results;
    });
  }
}
