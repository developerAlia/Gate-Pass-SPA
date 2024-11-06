export interface VehicleVerify {
  isverified: boolean;
  notes: string;
  vehicleId: number;
}

export interface DrivingLicenseVerify {
  isverified: boolean;
  notes: string;
  usersId: number;
}

export interface UserDataVerify {
  isverified: boolean;
  notes: string;
  civilNumber: number;
}
export interface RequestVerify {
  requestsId: number;
  notes: string;
}
