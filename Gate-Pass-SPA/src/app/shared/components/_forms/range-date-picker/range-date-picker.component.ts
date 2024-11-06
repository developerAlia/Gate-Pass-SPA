import { Component, Input, OnInit, Self } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { NgbCalendar, NgbDate } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-range-date-picker",
  templateUrl: "./range-date-picker.component.html",
  styleUrls: ["./range-date-picker.component.scss"],
})
export class RangeDatePickerComponent implements ControlValueAccessor {
  @Input() displayMonths: number = 1;

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
    // this.fromDate = calendar.getToday();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  // ngOnInit(): void {
  // }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  writeValue(obj: any): void {
    // console.log(obj);
  }
  registerOnChange(fn: any): void {
    // console.log(fn);
  }
  registerOnTouched(fn: any): void {
    // console.log(fn);

  }
  setDisabledState?(isDisabled: boolean): void {}
}
