export interface UsersCard {
  usersId: number;
  systemId: number;
  fullNameEn: string;
  fullNameAr: string;
  email: string;
  zUserTypeId: number;
  img: string;
}

export interface LangPref {
  usersId: number;
  langPref: string;
}
