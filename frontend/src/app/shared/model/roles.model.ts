export class RolesModel {
  isAdmin: boolean;
  isPoliceOfficer: boolean;
  isUser: boolean;

  constructor() {
    this.isAdmin = false;
    this.isPoliceOfficer = false;
    this.isUser = false;
  }
}
