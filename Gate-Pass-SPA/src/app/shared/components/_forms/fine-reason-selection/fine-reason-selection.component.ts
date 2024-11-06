import { Component, Input, OnInit, Self, SimpleChanges } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { zFineReason } from "src/app/shared/models/zsk/zFineReason";
import { ZskService } from "src/app/shared/services/zsk.service";

@Component({
  selector: "fine-reason-selection",
  templateUrl: "./fine-reason-selection.component.html",
  styleUrls: ["./fine-reason-selection.component.scss"],
})
export class FineReasonSelectionComponent
  implements OnInit, ControlValueAccessor
{
  @Input() fineTypeId: number;
  fineReason: zFineReason[] = [];

  constructor(
    private zskService: ZskService,
    public translate: TranslateService,
    @Self() public ngControl: NgControl
  ) {
    this.getFineReason();
    this.ngControl.valueAccessor = this;
  }
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getFineReason();
  }

  getFineReason() {
    if (this.fineTypeId != null) {
      this.zskService
        .getZFineReasonByFineTypeId(this.fineTypeId)
        .subscribe((results) => {
          this.fineReason = results;
        });
    }
  }
}
