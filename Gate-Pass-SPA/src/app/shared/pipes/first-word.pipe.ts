import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "firstWord",
})
export class FirstWordPipe implements PipeTransform {
  transform(value: string, args: any[]): string {
    if (!value) {
      return "";
    }

    if (value.split(" ").length > 1) {
      return value.split(" ")[0] + " ...";
    } else {
      return value;
    }
  }
}
