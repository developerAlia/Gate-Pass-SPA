import {
  ControlValueAccessor,
  NgControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { Component, forwardRef, Input, OnInit, Self } from "@angular/core";
import { ZskService } from "src/app/shared/services/zsk.service";
import { VehicleMaker } from "src/app/shared/models/gatepass/vehicle";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-car-maker-autocomplete",
  templateUrl: "./car-maker-autocomplete.component.html",
  styleUrls: ["./car-maker-autocomplete.component.scss"],
})
export class CarMakerAutocompleteComponent implements ControlValueAccessor {
  vehicleMaker: VehicleMaker[] = [];
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
    this.zskService.getZVehicleMaker().subscribe((data: VehicleMaker[]) => {
      this.vehicleMaker = data;
    });
  }
}
