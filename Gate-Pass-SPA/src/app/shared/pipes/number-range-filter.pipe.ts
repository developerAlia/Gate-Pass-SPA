import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "numberRangeFilter",
})
export class NumberRangeFilterPipe implements PipeTransform {
  transform(value: any[], field: string, arg1?: any, arg2?: any) {
    if (arg1 && arg2 === "") {
      return value.filter((obj) => obj[field] >= arg1);
    } else if (arg1 && arg2) {
      return value.filter((obj) => obj[field] >= arg1 && obj[field] <= arg2);
    } else {
      return value;
    }
  }
}
