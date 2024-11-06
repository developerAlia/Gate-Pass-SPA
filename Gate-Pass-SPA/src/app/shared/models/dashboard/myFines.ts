export interface MyFines {
  usersId: number;
  fineId: number;
  vehicleId: number;
  plateNumber: number;
  year: number;
  zPlateCodeNameEn: string;
  zPlateCodeNameAr: string;
  zVehicleModelNameEn: string;
  zVehicleModelNameAr: string;
  zVehicleMakerNameEn: string;
  zVehicleMakerNameAr: string;
  zOwnershipTypeColorClass: string;
  zOwnershipTypeTextColor: string;
  zFinesTypeNameEn: string;
  zFinesTypeNameAr: string;
  zFinesReasonNameEn: string;
  zFinesReasonNameAr: string;
  createdOn: string;
  notes?: string;
}
