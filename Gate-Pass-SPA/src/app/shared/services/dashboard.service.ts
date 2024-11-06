import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { VehicleList } from "../models/admin/vehicleList";
import { MyFines } from "../models/dashboard/myFines";
import { MyGatePasses } from "../models/dashboard/myGatePasses";
import { MyVisitors } from "../models/dashboard/myVisitors";
import { UserTypeStats } from "../models/dashboard/stats/userStatistc";
import { PaginatedResult } from "../models/pagination";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  private baseUrl = environment.apiUrl + "dashboard/";
  constructor(private http: HttpClient) {}

  getMyVisitorsCard(
    page?,
    itemsPerPage?,
    usersId?: number,
    date?: string
  ): Observable<PaginatedResult<MyVisitors[]>> {
    const paginatedResult: PaginatedResult<MyVisitors[]> = new PaginatedResult<
      MyVisitors[]
    >();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }
    if (usersId != null) {
      params = params.append("usersId", usersId);
    }
    if (date != null) {
      params = params.append("date", new Date(date).toDateString());
    }
    return this.http
      .get<MyVisitors[]>(this.baseUrl + "myVisitors", {
        observe: "response",
        params,
      })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get("Pagination") != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get("Pagination")
            );
          }
          return paginatedResult;
        })
      ); // ,httpOptions
  }

  getMyGatePassesCard(
    page?,
    itemsPerPage?,
    usersId?: number,
    date?: string
  ): Observable<PaginatedResult<MyGatePasses[]>> {
    const paginatedResult: PaginatedResult<MyGatePasses[]> =
      new PaginatedResult<MyGatePasses[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }
    if (usersId != null) {
      params = params.append("usersId", usersId);
    }
    if (date != null) {
      params = params.append("date", new Date(date).toDateString());
    }
    return this.http
      .get<MyGatePasses[]>(this.baseUrl + "myGatePasses", {
        observe: "response",
        params,
      })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get("Pagination") != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get("Pagination")
            );
          }
          return paginatedResult;
        })
      ); // ,httpOptions
  }
  getMyFinesCard(
    page?,
    itemsPerPage?,
    usersId?: number,
    vehicleId?: number
  ): Observable<PaginatedResult<MyFines[]>> {
    const paginatedResult: PaginatedResult<MyFines[]> = new PaginatedResult<
      MyFines[]
    >();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }
    if (usersId != null) {
      params = params.append("usersId", usersId);
    }
    if (vehicleId != null) {
      params = params.append("vehicleId", vehicleId);
    }
    return this.http
      .get<MyFines[]>(this.baseUrl + "myFines", {
        observe: "response",
        params,
      })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get("Pagination") != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get("Pagination")
            );
          }
          return paginatedResult;
        })
      ); // ,httpOptions
  }

  getMyVehicle(usersId: number): Observable<VehicleList[]> {
    let params = new HttpParams();
    if (usersId != null) {
      params = params.append("usersId", usersId);
    }
    return this.http.get<VehicleList[]>(this.baseUrl + "myVehicles", {
      params,
    });
  }

  getUserTypeStats(): Observable<UserTypeStats[]> {
    return this.http.get<UserTypeStats[]>(
      this.baseUrl + "getUsersTypeStatistic"
    );
  }
  getVisitTypeStats(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "");
  }
  getRequestTypeStats(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "getRequestTypeStatistic");
  }
  getVehicleStats(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "");
  }
}
