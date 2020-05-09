import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppConfig} from '../../app.config';
import {SharedService} from '../../shared/service/shared.service';
import {Subscription} from 'rxjs';
import {MenuModel} from './sidenav.model';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  isAdmin = false;
  isPoliceOfficer = false;
  isUser = false;

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getMenuItems(): MenuModel[] {
    return [
      {
        name: 'Dashboard',
        type: 'link',
        value: AppConfig.DASHBOARD,
        icon: 'home',
        visibility: this.isAdmin
      },
      {
        name: 'Dashboard',
        type: 'link',
        value: AppConfig.USER_DASHBOARD,
        icon: 'home',
        visibility: this.isUser
      },
      {
        name: 'Dashboard',
        type: 'link',
        value: AppConfig.POLICE_OFFICER_DASHBOARD,
        icon: 'home',
        visibility: this.isPoliceOfficer
      },
      {
        name: 'Users',
        type: 'link',
        value: AppConfig.USER,
        icon: 'people',
        visibility: this.isAdmin
      },
    ];
  }

  getRoles() {
    this.sharedService.checkRoles();
    this.subscription.add(
      this.sharedService.isAdminRole.subscribe(value => {
        this.isAdmin = value;
      })
    );
    this.subscription.add(
      this.sharedService.isPoliceOfficerRole.subscribe(value => {
        this.isPoliceOfficer = value;
      })
    );
    this.subscription.add(
      this.sharedService.isUserRole.subscribe(value => {
        this.isUser = value;
      })
    );
  }

  trackByFn(index, item) {
    return index;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
