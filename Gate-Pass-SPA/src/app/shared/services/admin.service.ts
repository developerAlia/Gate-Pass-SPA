import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { CheckedInList } from "../models/admin/checkedInList";
import { Fine } from "../models/admin/fine";
import {
  ApprovedRequestList,
  CheckInRequest,
  RequestList,
} from "../models/admin/requestList";
import { VehicleList } from "../models/admin/vehicleList";
import {
  DrivingLicenseVerify,
  RequestVerify,
  UserDataVerify,
  VehicleVerify,
} from "../models/admin/verifyData";
import {
  VisitChecking,
  VisitDetails4Admin,
} from "../models/admin/visitDetails";
import { FilterParameters } from "../models/gatepass/filterParameters";
import { UsersCard } from "../models/gatepass/GatePassUser";
import { PaginatedResult } from "../models/pagination";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  private baseUrl = environment.apiUrl + "admin/";

  constructor(private http: HttpClient) {}

  getUsersCard(
    page?,
    itemsPerPage?,
    userParams?: FilterParameters
  ): Observable<PaginatedResult<UsersCard[]>> {
    const paginatedResult: PaginatedResult<UsersCard[]> = new PaginatedResult<
      UsersCard[]
    >();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }
    if (userParams != null) {
      if (userParams.civil_ID != null) {
        params = params.append("civil_ID", userParams.civil_ID);
      }
      if (userParams.fullName != null) {
        params = params.append("fullName", userParams.fullName);
      }
      if (userParams.zUnitId != null) {
        params = params.append("zUnitId", userParams.zUnitId.toLocaleString());
      }
      if (userParams.createdDate != null) {
        params = params.append("createdDate", userParams.createdDate);
      }
      if (userParams.zFormStausId != null) {
        params = params.append(
          "zFormStausId",
          userParams.zFormStausId.toLocaleString()
        );
      }
    }
    return this.http
      .get<UsersCard[]>(this.baseUrl + "UserList", {
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

  getRequestListCard(
    page?,
    itemsPerPage?,
    zRequestsTypesId?: number
  ): Observable<PaginatedResult<RequestList[]>> {
    const paginatedResult: PaginatedResult<RequestList[]> = new PaginatedResult<
      RequestList[]
    >();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }
    if (zRequestsTypesId != null) {
      params = params.append("zRequestsTypesId", zRequestsTypesId);
    }
    return this.http
      .get<RequestList[]>(this.baseUrl + "requestList", {
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
      );
  }

  getRequestListReport(
    page?,
    itemsPerPage?,
    zUserTypeId?: number,
    zRequestsTypesId?: number,
    zRequestsStatusId?: number,
    date?: string
  ): Observable<PaginatedResult<RequestList[]>> {
    const paginatedResult: PaginatedResult<RequestList[]> = new PaginatedResult<
      RequestList[]
    >();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }
    if (zUserTypeId != null) {
      params = params.append("zUserTypeId", zUserTypeId);
    }
    if (zRequestsTypesId != null) {
      params = params.append("zRequestsTypesId", zRequestsTypesId);
    }
    if (zRequestsStatusId != null) {
      params = params.append("zRequestsStatusId", zRequestsStatusId);
    }
    if (date != null) {
      params = params.append("date", date);
    }
    return this.http
      .get<RequestList[]>(this.baseUrl + "SearchRequest", {
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
      );
  }

  putVehicleVerify(data: VehicleVerify): Observable<any> {
    return this.http.put(this.baseUrl + "verifiyVehicleDetails", data);
  }
  putDrivingLicenseVerify(data: DrivingLicenseVerify): Observable<any> {
    return this.http.put(this.baseUrl + "verifiyDrivingLicense", data);
  }
  putUserDataVerify(data: UserDataVerify): Observable<any> {
    return this.http.put(this.baseUrl + "verifiyUserData", data);
  }
  putRequestVerify(data: RequestVerify): Observable<any> {
    return this.http.put(this.baseUrl + "verifiyRequest", data);
  }
  getRequestCheckIn(id): Observable<VisitDetails4Admin> {
    return this.http.get<VisitDetails4Admin>(
      this.baseUrl + "getVisitDetails/" + id
    );
  }

  getRequestCheckInDetails(
    visitDetailsId,
    page?,
    itemsPerPage?
  ): Observable<PaginatedResult<VisitChecking[]>> {
    // return this.http.get<VisitDetails4Admin>(
    //   this.baseUrl + "getVisitDetails/" + id
    // );

    const paginatedResult: PaginatedResult<VisitChecking[]> =
      new PaginatedResult<VisitChecking[]>();
    let params = new HttpParams();
    if (visitDetailsId != null) {
      params = params.append("VisitDetailsId", visitDetailsId);
    }
    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }
    return this.http
      .get<VisitChecking[]>(this.baseUrl + "getVisitChickingDetails", {
        observe: "response",
        params,
        headers: { skip: "true" },
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
      );
  }

  postRequestCheckIn(data: CheckInRequest): Observable<any> {
    return this.http.post(this.baseUrl + "visitChecking", data);
  }
  getApprovedRequestList(
    page?,
    itemsPerPage?,
    date?,
    headers = "true",
    phone?,
    civilNumber?
  ): Observable<PaginatedResult<ApprovedRequestList[]>> {
    const paginatedResult: PaginatedResult<ApprovedRequestList[]> =
      new PaginatedResult<ApprovedRequestList[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }
    if (date != null) {
      params = params.append("date", date);
    }
    if (phone != null) {
      params = params.append("phone", phone);
    }
    if (civilNumber != null) {
      params = params.append("civilNumber", civilNumber);
    }

    return this.http
      .get<ApprovedRequestList[]>(this.baseUrl + "getApprovedRequestList", {
        observe: "response",
        params,
        headers: { skip: headers },
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
      );
  }
  getCheckedInList(
    page?,
    itemsPerPage?,
    date?
  ): Observable<PaginatedResult<CheckedInList[]>> {
    const paginatedResult: PaginatedResult<CheckedInList[]> =
      new PaginatedResult<CheckedInList[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }
    if (date != null) {
      params = params.append("date", date);
    }
    return this.http
      .get<CheckedInList[]>(this.baseUrl + "getCheckedInList", {
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
      );
  }

  getVehicleList(
    page?,
    itemsPerPage?,
    plateNumber?,
    PlateCodeId?
  ): Observable<PaginatedResult<VehicleList[]>> {
    const paginatedResult: PaginatedResult<VehicleList[]> = new PaginatedResult<
      VehicleList[]
    >();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }
    if (plateNumber != null) {
      params = params.append("plateNumber", plateNumber);
    }
    if (PlateCodeId != null) {
      params = params.append("plateCodeId", PlateCodeId);
    }
    return this.http
      .get<VehicleList[]>(this.baseUrl + "vehiclesList", {
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
      );
  }

  postFine(data: Fine): Observable<any> {
    return this.http.post(this.baseUrl + "Fines", data);
  }
}
