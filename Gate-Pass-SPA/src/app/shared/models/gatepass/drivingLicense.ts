export interface DrivingLicense {
  drivingLicenseId: number;
  usersId: number;
  licenseURL: string;
  expairyDate: string;
  isverified: boolean;
  notes?: any;
}

export interface DrivingLicenseAttach {
  usersId: number;
  licenseURL: File;
}
export interface DrivingLicensePost {
  usersId: number;
  expairyDate: string;
}
