import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { PaginatedResult } from "../models/pagination";
import { zFineReason } from "../models/zsk/zFineReason";
import { zFineType } from "../models/zsk/zFineType";
import { zGender } from "../models/zsk/zGender";
import { zNationality } from "../models/zsk/zNationality";
import { zPlateCode } from "../models/zsk/zPlateCode";
import { zExternalUserType } from "../models/zsk/zExternalUserType";
import { VehicleMaker, VehicleModel } from "../models/gatepass/vehicle";
import { zColors } from "../models/zsk/zColors";
import { zRelationship } from "../models/zsk/zRelationship";
import { zVisitType } from "../models/zsk/zVisitType";
import { zOwnershipTypes } from "../models/zsk/zOwnershipTypes";
import { zRequestsTypes } from "../models/zsk/zRequestsTypes";
import { zRequestsStatus } from "../models/zsk/zRequestsStatus";
import { zUserType } from "../models/zsk/zUserType";

@Injectable({
  providedIn: "root",
})
export class ZskService {
  baseUrl = environment.apiUrl + "zSK/";
  constructor(private http: HttpClient) {}

  getZPlateCode(): Observable<zPlateCode[]> {
    return this.http.get<zPlateCode[]>(this.baseUrl + "zPlateCode");
  }
  getZPlateCodeById(id: number): Observable<zPlateCode> {
    return this.http.get<zPlateCode>(this.baseUrl + "zPlateCode/" + id);
  }
  getZColors(): Observable<zColors[]> {
    return this.http.get<zColors[]>(this.baseUrl + "zcolors");
  }
  getZColorsById(zColorsId: number): Observable<zColors> {
    return this.http.get<zColors>(this.baseUrl + "zcolors/" + zColorsId);
  }
  getZGender(): Observable<zGender[]> {
    return this.http.get<zGender[]>(this.baseUrl + "zGender");
  }
  getZGenderById(zGenderId: number): Observable<zGender> {
    return this.http.get<zGender>(this.baseUrl + "zGenderById/" + zGenderId);
  }
  getZFineReasonByFineTypeId(id: any): Observable<zFineReason[]> {
    return this.http.get<zFineReason[]>(this.baseUrl + "zFinesReason/" + id);
  }
  getZFineReasonById(zFinesReasonId: any): Observable<zFineReason> {
    return this.http.get<zFineReason>(
      this.baseUrl + "zFinesReasonById/" + zFinesReasonId
    );
  }
  getZFineType(): Observable<zFineType[]> {
    return this.http.get<zFineType[]>(this.baseUrl + "zFinesType");
  }
  getZFineTypeById(zFinesTypeId: number): Observable<zFineType> {
    return this.http.get<zFineType>(
      this.baseUrl + "zFinesType/" + zFinesTypeId
    );
  }
  getZVehicleModel(id: any): Observable<VehicleModel[]> {
    return this.http.get<VehicleModel[]>(this.baseUrl + "zVehicleModel/" + id);
  }
  getZVehicleModelById(zModelId: any): Observable<VehicleModel> {
    return this.http.get<VehicleModel>(
      this.baseUrl + "zVehicleModelInfo/" + zModelId
    );
  }
  getZNationality(): Observable<zNationality[]> {
    return this.http.get<zNationality[]>(this.baseUrl + "zNationality");
  }
  getZNationalityById(zNationalityId: number): Observable<zNationality> {
    return this.http.get<zNationality>(
      this.baseUrl + "zNationality/" + zNationalityId
    );
  }
  getZExternalUserType(): Observable<zExternalUserType> {
    return this.http.get<zExternalUserType>(this.baseUrl + "zExternalUserType");
  }
  getZVehicleMaker(): Observable<VehicleMaker[]> {
    return this.http.get<VehicleMaker[]>(this.baseUrl + "zVehicleMaker");
  }
  getZVehicleMakerById(id: any): Observable<VehicleMaker> {
    return this.http.get<VehicleMaker>(this.baseUrl + "zVehicleMaker/" + id);
  }
  getZRelationship(numOfDays: number): Observable<zRelationship[]> {
    return this.http.get<zRelationship[]>(
      this.baseUrl + "zRelationships/" + numOfDays
    );
  }
  getZRelationshipById(zRelationshipId: number): Observable<zRelationship> {
    return this.http.get<zRelationship>(
      this.baseUrl + "zRelationshipById/" + zRelationshipId
    );
  }
  getzVisitType(isOfficer: boolean): Observable<zVisitType[]> {
    return this.http.get<zVisitType[]>(
      this.baseUrl + "zVisitType/" + isOfficer
    );
  }
  getzVisitTypeById(zVisitTypeId: number): Observable<zVisitType> {
    return this.http.get<zVisitType>(
      this.baseUrl + "zVisitTypeById/" + zVisitTypeId
    );
  }
  getzOwnershipTypes(): Observable<zOwnershipTypes[]> {
    return this.http.get<zOwnershipTypes[]>(this.baseUrl + "zOwnershipTypes/");
  }
  getzOwnershipTypesById(id: number): Observable<zOwnershipTypes> {
    return this.http.get<zOwnershipTypes>(
      this.baseUrl + "zOwnershipTypes/" + id
    );
  }
  getzRequestsTypes(): Observable<zRequestsTypes[]> {
    return this.http.get<zRequestsTypes[]>(this.baseUrl + "zRequestsTypes/");
  }
  getzRequestsStatus(): Observable<zRequestsStatus[]> {
    return this.http.get<zRequestsStatus[]>(
      this.baseUrl + "zGetRequestsStatus"
    );
  }
  getzUserType(): Observable<zUserType[]> {
    return this.http.get<zUserType[]>(this.baseUrl + "zUserType");
  }

  postVehicleMaker(vehicleMaker: VehicleMaker): Observable<any> {
    return this.http.post(this.baseUrl + "zVehicleMaker ", vehicleMaker);
  }
}
