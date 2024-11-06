export interface VehicleMaker {
  zMakerId: number;
  nameEn: string;
  nameAr: string;
  status: boolean;
}

export interface VehicleModel {
  zModelId: number;
  nameEn: string;
  nameAr: string;
  status: boolean;
}

export interface Vehicle2Get {
  vehicleId: number;
  zMakerId: number;
  zModelId: number;
  year: number;
  plateNumber: number;
  zPlateCodeId: number;
  zColorsId: number;
  registrationURL: string;
  registrationIssue: string;
  registrationExpairy: string;
  rentalContract?: any;
  ownerIdCardURl?: any;
  noObjectionLetter?: any;
  notes?: any;
  owned: boolean;
  zOwnershipTypeId: number;
}

export interface VehicleAttach {
  ownerIdCardURL: File;
  registrationURL: File;
  rentalContractURL: File;
  noObjectionLetterURL: File;
}

export interface Vehicle2Post {
  vehicleId: number;
  usersId: number;
  zModelId: number;
  notes?: string;
  owned: boolean;
  zOwnershipTypeId: number;
  plateNumber: number;
  zPlateCodeId: number;
  year: number;
  zColorsId: number;
  registrationIssue: string;
  registrationExpairy: string;
}

export interface VehicleById {
  vehicleId: number
  usersId: number
  systemId: number
  ownerNameEn: string
  ownerNameAr: string
  zMakerId: number
  zMakerNameEn: string
  zMakerNameAr: string
  zModelId: number
  zModelNameEn: string
  zModelNameAr: string
  year: number
  plateNumber: number
  zPlateCodeId: number
  zPlateCodeNameEn: string
  zPlateCodeNameAr: string
  notes: any
  owned: boolean
  zOwnershipTypeId: number
  zOwnershipTypeNameEn: string
  zOwnershipTypeNameAr: string
  zColorsId: number
  zColorsNameEn: string
  zColorsNameAr: string
  registrationURL: any
  registrationIssue: string
  registrationExpairy: string
  rentalContract: any
  ownerIdCardURl: any
  noObjectionLetter: any
  isverified: boolean
  colorClass: string
  textColor: string
}

// export interface VehiclePost {
//   zVehicleModelId: number;
//   Note: string;
//   Owned: boolean;
//   zOwnershipTypeId: number;
//   PlateNumber: string;
//   zPlateCodeId: number;
//   Year: string;
//   zColorsId: number;
//   VehicleRegistrationIssue: string;
//   VehicleRegistrationExpairy: string;
// }

// export interface Vehicle2PostDto {
//   vehicleId: number;
//   gatePassUsersId: number;
//   zVehicleModelId: number;
//   zGatePassStatusId: number;
//   note: string;
//   owned: boolean;
//   zOwnershipTypeId: number;
//   plateNumber: number;
//   zPlateCodeId: number;
//   year: number;
//   zColorsId: number;
//   vehicleRegistrationFront: string;
//   vehicleRegistrationBack: string;
//   vehicleRegistrationIssue: string;
//   vehicleRegistrationExpairy: string;
//   rentalContract: string;
//   ownerIdCardURl: string;
//   noObjectionLetter: string;
//   createdBy: string;
//   createdOn: string;
//   modifiedBy: string;
//   modifiedOn: string;
// }

// export interface VehicleAttach {
//   VehicleId: number;
//   VehicleRegistrationFront: string;
//   VehicleRegistrationBack: string;
//   RentalContract: string;
//   OwnerIdCardURl: string;
//   NoObjectionLetter: string;
// }

// export interface GetVehicle {
//   VehicleId: number;
// }
