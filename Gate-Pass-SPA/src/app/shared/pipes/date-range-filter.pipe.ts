import { Pipe, PipeTransform } from "@angular/core";
import { NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";

@Pipe({
  name: "dateRangeFilter",
})
export class DateRangeFilterPipe implements PipeTransform {
  constructor(private ngbDateParserFormatter: NgbDateParserFormatter) {}

  transform(value: any[], field: string, arg1?: any, arg2?: any) {
    const formatedDateFrom = this.ngbDateParserFormatter.format(arg1);
    const formatedDateTo = this.ngbDateParserFormatter.format(arg2);

    if (formatedDateFrom && formatedDateTo === "") {
      const fromDate = new Date(formatedDateFrom);
      return value.filter((obj) => new Date(obj[field]) > fromDate);
    } else if (formatedDateFrom && formatedDateTo) {
      const fromDate = new Date(formatedDateFrom);
      const toDate = new Date(formatedDateTo);
      return value.filter(
        (obj) =>
          new Date(obj[field]) > fromDate && new Date(obj[field]) < toDate
      );
    } else {
      return value;
    }
  }
}
