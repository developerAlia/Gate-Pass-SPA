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
import { zPlateCode } from "src/app/shared/models/zsk/zPlateCode";
import { zRelationship } from "src/app/shared/models/zsk/zRelationship";
import { ZskService } from "src/app/shared/services/zsk.service";

@Component({
  selector: "app-relationship-selection",
  templateUrl: "./relationship-selection.component.html",
  styleUrls: ["./relationship-selection.component.scss"],
})
export class RelationshipSelectionComponent
  implements OnInit, ControlValueAccessor, OnChanges
{
  zRelationship: zRelationship[] = [];
  @Input() numOfDays: number = 0;

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
    this.getRelationship();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getRelationship();
  }

  getRelationship() {
    this.zskService.getZRelationship(this.numOfDays).subscribe((results) => {
      this.zRelationship = results;
    });
  }
}
