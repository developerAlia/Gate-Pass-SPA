import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "externalHref",
})
export class ExternalHrefPipe implements PipeTransform {
  transform(href: string): string {
    return /^https?/.test(href) ? href : `//${href}`;
  }
}




/*
It's uses to check if the link contains protocol(http or https) or not.
I Use it for open the pages that not contains the protocol as new tab
*/
