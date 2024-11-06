export interface zRelationship {
  zRelationshipId: number;
  nameEn: string;
  nameAr: string;
  dayFrom: number;
  dayTo: number;
  status: boolean;
  createdBy: string;
  createdOn: Date;
  modifiedBy?: any;
  modifiedOn?: any;
}
