import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterSearch",
})
export class FilterSearchPipe implements PipeTransform {
  transform(value: any[], field: string, args: string): any[] {
    let filter: string = args ? args.toLocaleLowerCase() : null;
    return filter
      ? value.filter(
          (item: any) => item[field].toLocaleLowerCase().indexOf(filter) != -1
        )
      : value;
  }
}
