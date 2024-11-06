import { DrivingLicense } from "./drivingLicense";

export interface User {
  systemId: number;
  fullNameEn: string;
  fullNameAr: string;
  userName: string;
  departmentEn: string;
  departmentAr: string;
  mobile: string;
  langPref?: any;
  email: string;
  designationEn: string;
  designationAr: string;
  zUserTypeId: number;
  isOfficer?: boolean;
  img: string;
}

export interface Vehicle {
  vehicleId: number;
  usersId: number;
  systemId: number;
  zMakerId: number;
  zMakerNameEn?: string;
  zMakerNameAr?: string;
  zModelId: number;
  zModelNameEn?: string;
  zModelNameAr?: string;
  year: number;
  plateNumber: number;
  zPlateCodeId: number;
  zPlateCodeNameAr?:string;
  zPlateCodeNameEn?:string;

  notes?: string;
  owned: boolean;
  zOwnershipTypeId: number;
  zOwnershipTypeNameEn?: string;
  zOwnershipTypeNameAr?: string;
  zColorsId: number;
  zColorsNameEn?: string;
  zColorsNameAr?: string;
  registrationURL?: any;
  registrationIssue: string;
  registrationExpairy: string;
  rentalContract?: any;
  ownerIdCardURl?: any;
  noObjectionLetter?: any;
  colorClass?: string;
  textColor?: string;
  isverified: boolean;
}

export interface Visitor {
  externalUsersId: number;
  name: string;
  zGenderId: number;
  zGenderNameEn?: string;
  zGenderNameAr?: string;
  zNationalityId: number;
  zNationalityNameEn?: string;
  zNationalityNameAr?: string;
  phone: number;
  civilNumber: number;
  imgURl?: any;
  civilIdURL: string;
  civilIdExpairyDate: string;
  isverified: boolean;
  notes?: string;
  img: string;
}

export interface VisitDetails {
  visitDetailsId: number;
  dateFrom: string;
  dateTo: string;
  zVisitTypeId: number;
  zVisitTypeNameEn?: string;
  zVisitTypeNameAr?: string;
  zVisitTypeDayTo: number;
  visitorId: number;
  zRelationshipsId: number;
  zRelationshipsNameEn?: string;
  zRelationshipsNameAr?: string;
  visitor: Visitor;
}

// export interface DrivingLicense {
//   drivingLicenseId: number;
//   usersId: number;
//   licenseURL: string;
//   expairyDate: string;
//   isverified: boolean;
//   notes: string;
// }

export interface Request2Get {
  requestsId: number;
  vehicleId: number;
  visitDetailsId?: number;
  usersId: number;
  user?: User;
  vehicle?: Vehicle;
  visitDetails?: VisitDetails;
  drivingLicense?: DrivingLicense;
  zRequestsStatusId: number;
  zRequestsStatusNameEn: string;
  zRequestsStatusNameAr: string;
  zRequestsTypesId: number;
  zRequestsTypesNameEn: string;
  zRequestsTypesNameAr: string;
  notes: string;
}
