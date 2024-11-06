// export interface Sys_userInfo {
//   token: string;
//   gatePassUserId: number;
//   systemId: number;
//   fullNameEn: string;
//   fullNameAr: string;
//   userName: string;
//   zUserTypeId: number;
//   img?: any;
//   roles: [];
//   departmentEn: string;
//   departmentAr: string;
//   mobile: string;
//   email: string;
//   designationEn: string;
//   designationAr: string;
//   langPref?: string;
// }

export interface Sys_userInfo {
  usersId: number;
  systemId: number;
  token: string;
  fullNameEn: string;
  fullNameAr: string;
  zUserTypeId: number;
  langPref: string;
  isOfficer: boolean;
  img: string;
  roles: [];

  userName: string;
  departmentEn: string;
  departmentAr: string;
  mobile: string;
  email: string;
  designationEn: string;
  designationAr: string;
}
