import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: "root",
})
export class BusyService {
  busyRequestCount = 0;
  constructor(private spinnerService: NgxSpinnerService) {}

  busy() {
    this.busyRequestCount++;
    this.spinnerService.show(undefined, {
      // type: 'line-scale-party',
      // bdColor: 'rbga(255,255,255,0)',
      // color: '#333333'
      type: "ball-scale-multiple",
      bdColor: "rgba(51,51,51,0.8)",
      color: "#fff",
    });
  }

  idle() {
    this.busyRequestCount = 0;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
