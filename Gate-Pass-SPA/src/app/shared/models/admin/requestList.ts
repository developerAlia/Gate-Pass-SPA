export interface RequestList {
  requestsId: number;
  usersId: number | null;
  fullNameEn: string;
  fullNameAr: string;
  zRequestsTypesId: number;
  zRequestsTypesNameEn: string;
  zRequestsTypesNameAr: string;
  zRequestsStatusNameEn: string;
  zRequestsStatusNameAr: string;
  zUserTypeId: number;
  userTypeNameEn: string;
  userTypeNameAr: string;
  requestDate: string;
}
export interface ApprovedRequestList {
  requestsId: number;
  visitDetailsId: number;
  visitorId: number;
  visitor?: any;
  visitorName: string;
  fromDate: Date;
  toDate: Date;
  zVisitTypesNameEn: string;
  zVisitTypesNameAr: string;
  phone: number;
  usersId: number;
  zUserTypeId: number;
  fullNameEn: string;
  fullNameAr: string;
}

export interface CheckInRequest {
  visitCheckingId: number;
  visitDetailsId: number;
}
