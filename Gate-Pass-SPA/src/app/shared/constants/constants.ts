import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class Constants {
  public static FILE_TYPE_PDF = ["pdf"];
  public static MAX_SIZE_PDF = 15360;
  public static FILE_TYPE_PHOTO = ["jpg"];
  public static MAX_SIZE_IMG = 7000;
}
