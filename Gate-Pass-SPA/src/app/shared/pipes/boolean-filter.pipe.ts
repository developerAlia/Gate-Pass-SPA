import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "booleanFilter",
})
export class BooleanFilterPipe implements PipeTransform {
  transform(value: any[], field: string, args: boolean): any[] {
    if (args === true) {
      return value.filter((item: any) => item[field] === args);
    } else if (args === false) {
      return value;
    } else {
      return value;
    }
  }
}
