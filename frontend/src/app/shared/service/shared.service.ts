import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AppConfig} from '../../app.config';
import {StorageService} from './storage.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Roles} from '../constant';
import {RolesModel} from "../model/roles.model";


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAdminRole: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isPoliceOfficerRole: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isUserRole: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public getLoggedInRoles: BehaviorSubject<RolesModel> = new BehaviorSubject<RolesModel>(new RolesModel());

  constructor(
    private storageService: StorageService,
    private router: Router,
    private http: HttpClient
  ) {
  }

  checkLoggedIn() {
    if (this.storageService.getUserToken()) {
      this.isUserLoggedIn.next(true);
    }
  }

  checkRoles() {
    if (this.storageService.getRole()) {
      this.isAdminRole.next(this.storageService.getRole().includes(Roles.ROLE_ADMIN));
      this.isPoliceOfficerRole.next(this.storageService.getRole().includes(Roles.ROLE_POLICE_OFFICER));
      this.isUserRole.next(this.storageService.getRole().includes(Roles.ROLE_USER));
    }
  }

  refreshGetRoles() {
    const roles: RolesModel = new RolesModel();
    this.checkRoles();
    roles.isAdmin = this.storageService.getRole().includes(Roles.ROLE_ADMIN);
    roles.isPoliceOfficer = this.storageService.getRole().includes(Roles.ROLE_POLICE_OFFICER);
    roles.isUser = this.storageService.getRole().includes(Roles.ROLE_USER);
    this.getLoggedInRoles.next(roles);
  }

  shutRoleFlags() {
    this.isUserLoggedIn.next(false);
    this.isAdminRole.next(false);
  }

  logout() {
    this.isAdminRole.next(false);
    this.isPoliceOfficerRole.next(false);
    this.isUserRole.next(false);
    this.storageService.clearStorage();
    this.router.navigate([AppConfig.LOGIN]).then();
    this.shutRoleFlags();
    return this.http.get(AppConfig.LOGOUT_API);
  }

}
