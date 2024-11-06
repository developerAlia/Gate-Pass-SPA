import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements ControlValueAccessor {
  @Input() label = 'mm-dd-yyyy';
  @Input() readonlyStatus = true;
  @Input() isRequired = true;
  @Input () minDate = '';
  @Input () maxDate = '';
  constructor(
    @Self() public ngControl: NgControl, private ngbDateParserFormatter: NgbDateParserFormatter) {
    this.ngControl.valueAccessor = this;
  }
  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

}
