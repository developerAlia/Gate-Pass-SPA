import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class QrCodeService {
  private baseUrl = environment.apiUrl + "QrCode/";

  constructor(private http: HttpClient) {}

  getQrCode(code: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "cardQr/" + code);
  }
}
