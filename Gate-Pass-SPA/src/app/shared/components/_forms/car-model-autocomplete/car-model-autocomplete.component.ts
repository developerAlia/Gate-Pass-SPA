import { ControlValueAccessor, NgControl } from "@angular/forms";
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Self,
  SimpleChanges,
} from "@angular/core";
import { ZskService } from "src/app/shared/services/zsk.service";
import { TranslateService } from "@ngx-translate/core";
import { VehicleModel } from "src/app/shared/models/gatepass/vehicle";

@Component({
  selector: "app-car-model-autocomplete",
  templateUrl: "./car-model-autocomplete.component.html",
  styleUrls: ["./car-model-autocomplete.component.scss"],
})
export class CarModelAutocompleteComponent
  implements ControlValueAccessor, OnChanges
{
  @Input() label: string;
  @Input() readonlyStatus = true;
  @Input() makerId: number;
  vehicleModel: VehicleModel[] = [];
  constructor(
    private zskService: ZskService,
    public translate: TranslateService,
    @Self() public ngControl: NgControl
  ) {
    this.ngControl.valueAccessor = this;
    this.getCarModel();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getCarModel();
  }
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  getCarModel() {
    this.vehicleModel = [];
    if (this.makerId != null) {
      this.zskService.getZVehicleModel(this.makerId).subscribe((results) => {
        this.vehicleModel = results;
      });
    }
  }
}
