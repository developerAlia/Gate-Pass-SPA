import { Sys_userInfo } from './../models/sys/sys_userInfo';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Depatment } from "../models/hrms/deptName";
import { HrmsInfo } from "../models/hrms/hrmsInfo";
import { HrmsSearch } from "../models/hrms/hrmsSearch";
import { QualificationInfo } from "../models/hrms/qualificationInfo";
import { PaginatedResult } from "../models/pagination";
@Injectable({
  providedIn: "root",
})
export class HrmsService {
  baseUrl = environment.apiUrl + "hrms/";
  constructor(private http: HttpClient) {}

  getHrmsInfo(id: number): Observable<Sys_userInfo> {
    return this.http.get<Sys_userInfo>(this.baseUrl + "hrmsInfo/" + id);
  }
  qualification2GetHrms(id: number): Observable<QualificationInfo[]> {
    return this.http.get<QualificationInfo[]>(this.baseUrl + "hrmsQuals/" + id);
  }
  department2GetHrms(): Observable<Depatment[]> {
    return this.http.get<Depatment[]>(this.baseUrl + "departments");
  }

  hrmsAutoCompleteSearch(searchKey?: string, ownerId?:number): Observable<HrmsSearch[]> {
    const paginatedResult: PaginatedResult<HrmsSearch[]> = new PaginatedResult<
      HrmsSearch[]
    >();
    return this.http.get<HrmsSearch[]>(this.baseUrl + "hrmsname/" + searchKey +'/' + ownerId, {
      headers: { skip: "true" },
    });
  }
}
