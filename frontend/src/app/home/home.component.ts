import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppConfig} from '../app.config';
import {StorageService} from '../shared/service/storage.service';
import {Router} from '@angular/router';
import {Subscription} from "rxjs";
import {SharedService} from "../shared/service/shared.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  signUpURL = AppConfig.REGISTRATION;
  loginURL = AppConfig.LOGIN;

  constructor(
    private sharedService: SharedService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.storageService.getUserToken()) {
      this.redirectToDashboard();
    }
  }

  redirectToDashboard() {
    this.subscription.add(
      this.sharedService.isAdminRole.subscribe(value => {
        if (value) {
          this.router.navigate([AppConfig.DASHBOARD]).then();
        } else {
          this.subscription.add(
            this.sharedService.isPoliceOfficerRole.subscribe(value => {
              if (value) {
                this.router.navigate([AppConfig.POLICE_OFFICER_DASHBOARD]).then();
              } else {
                this.subscription.add(
                  this.sharedService.isUserRole.subscribe(value => {
                    if (value) {
                      this.router.navigate([AppConfig.USER_DASHBOARD]).then();
                    }
                  })
                );
              }
            })
          );
        }
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
