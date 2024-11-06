import {
  Vehicle2Get,
  Vehicle2Post,
  VehicleAttach,
  VehicleById,
  VehicleMaker,
} from "../models/gatepass/vehicle";
import {
  DrivingLicense,
  DrivingLicenseAttach,
  DrivingLicensePost,
} from "../models/gatepass/drivingLicense";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { LangPref, UsersCard } from "../models/gatepass/GatePassUser";
import { map } from "rxjs/operators";
import { PaginatedResult } from "../models/pagination";
import { FilterParameters } from "../models/gatepass/filterParameters";
import { Sys_userInfo } from "../models/sys/sys_userInfo";
import { HrmsInfo } from "../models/hrms/hrmsInfo";
import {
  ExternalUserAttach,
  ExternalUserDetails,
} from "../models/gatepass/externalUserDetails";
import { GatePassRequest } from "../models/gatepass/gate-pass-request";
import { Request2Get } from "../models/gatepass/request2Get";
import { VehicleFines } from "../models/gatepass/vehicleFines";

@Injectable({
  providedIn: "root",
})
export class GatePassService {
  mainTablesUrl = environment.apiUrl + "zSK/";
  baseUrl = environment.apiUrl + "GatePass/";
  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<HrmsInfo> {
    return this.http.get<HrmsInfo>(this.baseUrl + "userProfile/" + id);
  }
  getVehicleByPlateAndCode(
    plateNumber: number,
    plateCode: number
  ): Observable<Vehicle2Get> {
    return this.http.get<Vehicle2Get>(
      this.baseUrl + "getVehicleByPlate/" + plateNumber + "/" + plateCode
    );
  }
  getVehicleById(vehicleId: number): Observable<VehicleById> {
    return this.http.get<VehicleById>(
      this.baseUrl + "vehicleDetailsById/" + vehicleId
    );
  }

  checkIfLicenseExists(): Observable<boolean> {
    return this.http.get<boolean>(this.baseUrl + "CheckDrivingLicense");
  }
  checkLicense(): Observable<DrivingLicense> {
    return this.http.get<DrivingLicense>(
      this.baseUrl + "GetExpairyDrivingLicense"
    );
  }

  postDrivingLicenseDate(drivingLicense: DrivingLicense): Observable<any> {
    return this.http.post(this.baseUrl + "DrivingLicense", drivingLicense);
  }

  // postGatePass(vehiclePost: VehiclePost): Observable<any> {
  //   return this.http.post(this.mainTablesUrl + "vehicle ", vehiclePost);
  // }

  // attachDrivingLicense(drivingLicenseAttach: DrivingLicenseAttach) {
  //   const formData: FormData = new FormData();
  //   formData.append(
  //     "drivingLicenseFile",
  //     drivingLicenseAttach.drivingLicenseFile,
  //     "drivingLicenseFile.Pdf"
  //   );

  //   return this.http.post(this.baseUrl + "DrivingLicense/Attach", formData);
  // }

  postChangeLanguage(data: LangPref): Observable<any> {
    console.log(data);
    const dataSend: { gatePassUserId: number; langPref: string } = {
      gatePassUserId: data.usersId,
      langPref: data.langPref,
    };

    return this.http.post(this.baseUrl + "changeLang", dataSend);
  }

  checkLicenseExpireydate(): Observable<DrivingLicense> {
    return this.http.get<DrivingLicense>(
      this.baseUrl + "GetExpairyDrivingLicense"
    );
  }

  getExternalUserDetails(id: number): Observable<ExternalUserDetails> {
    return this.http.get<ExternalUserDetails>(
      this.baseUrl + "getVisitorDetailsByIdCard/" + id
    );
  }

  postExternalUser(
    data: ExternalUserDetails,
    skipSnipper?: boolean
  ): Observable<any> {
    return this.http.post(this.baseUrl + "postExternalUser", data, {
      headers: { skip: skipSnipper == true ? "true" : "false" },
    });
  }

  postExternalUserAttach(data: ExternalUserAttach): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("civilNumber", data.civilNumber.toString());

    if (data.imgUrl != null) {
      const imgExt = data.imgUrl.name.split(".").pop();
      formData.append("imgUrl", data.imgUrl, "personImg" + imgExt);
    }
    if (data.civilIdUrl != null) {
      formData.append("civilIdUrl", data.civilIdUrl, "idDocument.Pdf");
    }

    return this.http.post(this.baseUrl + "postExternalUser/Attach", formData, {
      responseType: "text",
    });
  }

  postRequest(data: GatePassRequest): Observable<any> {
    return this.http.post(this.baseUrl + "postNewRequest", data);
  }

  getDrivingLicense(userid: number): Observable<DrivingLicense> {
    return this.http.get<DrivingLicense>(
      this.baseUrl + "getDrivingLicense/" + userid
    );
  }

  postDrivingLicense(data: DrivingLicensePost): Observable<any> {
    return this.http.post(this.baseUrl + "drivingLicense", data);
  }

  postDrivingLicenseAttach(data: DrivingLicenseAttach): Observable<any> {
    const formData: FormData = new FormData();

    if (data.licenseURL != null) {
      formData.append("usersId", data.usersId.toString());
      formData.append("licenseURL", data.licenseURL, "idDocument.Pdf");
    }

    return this.http.post(this.baseUrl + "drivingLicense/Attach", formData);
  }
  postVehicle(data: Vehicle2Post): Observable<any> {
    return this.http.post(this.baseUrl + "vehicle", data);
  }

  postVehicleAttachment(
    data: VehicleAttach,
    vehicleId: number
  ): Observable<any> {
    const formData: FormData = new FormData();

    if (data.noObjectionLetterURL != null) {
      formData.append(
        "noObjectionLetterURL",
        data.noObjectionLetterURL,
        "noObjectionLetterURL.Pdf"
      );
    }
    if (data.registrationURL != null) {
      formData.append(
        "registrationURL",
        data.registrationURL,
        "registrationURL.Pdf"
      );
    }
    if (data.ownerIdCardURL != null) {
      formData.append(
        "ownerIdCardURL",
        data.ownerIdCardURL,
        "ownerIdCardURL.Pdf"
      );
    }
    if (data.rentalContractURL != null) {
      formData.append(
        "rentalContractURL",
        data.rentalContractURL,
        "rentalContractURL.Pdf"
      );
    }

    return this.http.post(
      this.baseUrl + "vehicle/Attach/" + vehicleId,
      formData
    );
  }

  getVisitRequestById(requestId: number): Observable<Request2Get> {
    return this.http.get<Request2Get>(
      this.baseUrl + "getRequestDetails/" + requestId
    );
  }

  getCivilIdAttach(attchURL: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/pdf");

    // tslint:disable-next-line: object-literal-shorthand
    return this.http.get(this.baseUrl + "getCivilIdFile/" + attchURL, {
      headers: headers,
      responseType: "arraybuffer",
    });
  }
  getDrivingLicenseAttach(attchURL: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/pdf");

    // tslint:disable-next-line: object-literal-shorthand
    return this.http.get(this.baseUrl + "drivingLicense/" + attchURL, {
      headers: headers,
      responseType: "arraybuffer",
    });
  }
  getVehicleAttach(attchURL: string): any {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/pdf");

    // tslint:disable-next-line: object-literal-shorthand
    return this.http.get(this.baseUrl + "vehicle/" + attchURL, {
      headers: headers,
      responseType: "arraybuffer",
    });
  }

  getFinesByVehicleId(
    page?,
    itemsPerPage?,
    vehicleId?: number
  ): Observable<PaginatedResult<VehicleFines[]>> {
    const paginatedResult: PaginatedResult<VehicleFines[]> =
      new PaginatedResult<VehicleFines[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }
    if (vehicleId != null) {
      params = params.append("vehicleId", vehicleId);
    }
    return this.http
      .get<VehicleFines[]>(this.baseUrl + "getFinesByVehicleId", {
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
}
