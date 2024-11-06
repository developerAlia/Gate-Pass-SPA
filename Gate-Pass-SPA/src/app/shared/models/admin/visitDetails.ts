export interface Visitor {
  name: string;
  phone: number;
  civilNumber: number;
  imgURl?: any;
  img: string;
}

export interface Vehicle {
  vehicleId: number;
  zMakerNameEn: string;
  zMakerNameAr: string;
  zModelNameEn: string;
  zModelNameAr: string;
  year: number;
  plateNumber: number;
  zPlateCodeNameEn: string;
  zPlateCodeNameAr: string;
  colorClass: string;
}

export interface Requester {
  usersId: number;
  fullNameEn: string;
  fullNameAr: string;
  zUserTypeId: number;
  isOfficer: boolean;
  departmentEn: string;
  departmentAr: string;
  email: string;
  designationEn: string;
  designationAr: string;
  imgURl?: any;
  img: string;
}

export interface VisitDetails4Admin {
  visitDetailsId: number;
  visitorId: number;
  visitor: Visitor;
  fromDate: Date;
  toDate: Date;
  zVisitTypesNameEn: string;
  zVisitTypesNameAr: string;
  vehicle: Vehicle;
  usersId: number;
  requester: Requester;
  // visitChecking: VisitChecking[];
}

export interface VisitChecking {
  checkingDate: string;
}
