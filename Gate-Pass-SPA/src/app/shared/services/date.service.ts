import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DateService {
  constructor() {}

  addDays(numOfDays: number, date = new Date()) {
    date.setDate(date.getDate() + numOfDays);
    return date;
  }
  checkExpiryDate(date = new Date()) {
    const today = new Date();
    date.setHours(0, 0, 0, 0);

    today.setHours(0, 0, 0, 0);
    return date <= today;

    // date.setDate(date.getDate() + numOfDays);
    // return date;
  }
}
