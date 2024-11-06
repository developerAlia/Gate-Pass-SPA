import { Component, OnInit, Self } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { zRequestsStatus } from "src/app/shared/models/zsk/zRequestsStatus";
import { zRequestsTypes } from "src/app/shared/models/zsk/zRequestsTypes";
import { ZskService } from "src/app/shared/services/zsk.service";

@Component({
  selector: "request-status-selection",
  templateUrl: "./request-status-selection.component.html",
  styleUrls: ["./request-status-selection.component.scss"],
})
export class RequestStatusSelectionComponent
  implements OnInit, ControlValueAccessor
{
  zRequestsStatus: zRequestsStatus[] = [];

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
    this.zskService
      .getzRequestsStatus()
      .subscribe((data: zRequestsStatus[]) => {
        this.zRequestsStatus = data;
      });
  }
}
