import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { zGender } from 'src/app/shared/models/zsk/zGender';
import { zOwnershipTypes } from 'src/app/shared/models/zsk/zOwnershipTypes';
import { ZskService } from 'src/app/shared/services/zsk.service';

@Component({
  selector: 'owner-type-selection',
  templateUrl: './owner-type-selection.component.html',
  styleUrls: ['./owner-type-selection.component.scss']
})
export class OwnerTypeSelectionComponent implements OnInit, ControlValueAccessor {
  data: zOwnershipTypes[] = [];
  @Input() selectedId= null;

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
    this.getOwnershipTypes();
  }

  getOwnershipTypes() {
    this.zskService.getzOwnershipTypes().subscribe((results) => {
      this.data = results;
    });
  }
}
