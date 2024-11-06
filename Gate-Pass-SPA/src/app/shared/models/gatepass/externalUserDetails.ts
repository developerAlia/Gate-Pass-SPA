export interface ExternalUserDetails {
  externalUsersId?: number;
  usersId?: number;
  name?: string;
  zGenderId?: number;
  zNationalityID?: number;
  zNationalityNameEn?: string;
  zNationalityNameAr?: string;
  phone?: number;
  civilNumber?: number;
  imgURL?: string;
  civilIdURL?: string;
  civilIdExpairyDate: string;
  email?:string;
  departmentId?:number;
  modNumber?:number;
  zExternalUserTypeId?:number;
}

export interface ExternalUserAttach {
  imgUrl: File;
  civilIdUrl: File;
  civilNumber: number;
}
