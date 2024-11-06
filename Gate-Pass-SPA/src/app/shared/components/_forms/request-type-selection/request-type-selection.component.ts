import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Self,
  SimpleChanges,
} from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { zRelationship } from "src/app/shared/models/zsk/zRelationship";
import { zRequestsTypes } from "src/app/shared/models/zsk/zRequestsTypes";
import { ZskService } from "src/app/shared/services/zsk.service";

@Component({
  selector: "request-type-selection",
  templateUrl: "./request-type-selection.component.html",
  styleUrls: ["./request-type-selection.component.scss"],
})
export class RequestTypeSelectionComponent
  implements OnInit, ControlValueAccessor
{
  zRequestsTypes: zRequestsTypes[] = [];

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
    this.zskService.getzRequestsTypes().subscribe((data: zRequestsTypes[]) => {
      this.zRequestsTypes = data;
    });
  }
}
