import { DatePipe } from "@angular/common";
import { Inject, LOCALE_ID, Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "date",
})
export class DateExtendedPipe extends DatePipe implements PipeTransform {
  static readonly DEFAULT_FORMAT = "YYYY-MM-dd";

  constructor(@Inject(LOCALE_ID) locale: string) {
    super(locale);
  }

  transform(
    value: Date | string | number,
    format?: string,
    timezone?: string,
    locale?: string
  ): string | null;
  transform(
    value: null | undefined,
    format?: string,
    timezone?: string,
    locale?: string
  ): null;
  transform(
    value: Date | string | number | null | undefined,
    format?: string,
    timezone?: string,
    locale?: string
  ): string | null {
    // console.log('date format');

    const ghibFormat =
      format && format !== "shortDate"
        ? format
        : DateExtendedPipe.DEFAULT_FORMAT;
    return super.transform(value, ghibFormat, timezone, locale);
  }
}
