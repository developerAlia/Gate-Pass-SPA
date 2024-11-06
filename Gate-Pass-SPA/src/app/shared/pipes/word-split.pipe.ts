import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "wordSplit",
})
export class WordSplitPipe implements PipeTransform {
  transform(value: string, splitBy: string, joinBy?: string): string {
    // let val = value.split(splitBy).join(joinBy);
    // console.log(val);

    return value.split(splitBy).join(joinBy);
  }
}
