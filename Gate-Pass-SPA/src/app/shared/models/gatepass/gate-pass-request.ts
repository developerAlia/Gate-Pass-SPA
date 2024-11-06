export interface GatePassRequest {
  requestsId: number;
  usersId: number;
  vehicleId: number;
  visitDetailsId?: number;
  zRequestsTypesId?: number;
  zRequestsStatusId?: number;
  notes?: string;
  visitDetails?: VisitDetails;
}

export interface VisitDetails {
  visitDetailsId: number;
  dateFrom: string;
  dateTo: string;
  zVisitTypeId: number;
  visitorId: number;
  zRelationshipsId: number;
  status: boolean;
}

export interface ResponsePostRequest {
  requestsId: number;
  zRequestsStatusId: number;
  zRequestsStatusNameEn: string;
  zRequestsStatusNameAr: string;
  colorClass?: string;
}
