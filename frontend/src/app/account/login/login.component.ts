import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountDetailsModel, LoginModel, TokenModel} from './login.model';
import {Subscription} from 'rxjs';
import {LoginService} from './login.service';
import {StorageService} from '../../shared/service/storage.service';
import {Router} from '@angular/router';
import {AppConfig} from '../../app.config';
import {SharedService} from '../../shared/service/shared.service';
import {AlertService} from '../../layout/alert/alert.service';
import {SpinnerService} from '../../shared/service/spinner.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginParam: LoginModel = new LoginModel();
  subscription: Subscription = new Subscription();
  signUpURL = AppConfig.REGISTRATION;
  isDisableBtn = false;
  isLoggedIn = false;

  constructor(
    private sharedService: SharedService,
    private storageService: StorageService,
    private alertService: AlertService,
    public spinnerService: SpinnerService,
    private loginService: LoginService,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (this.isLoggedIn && this.storageService.getUserToken()) {
      this.redirectToDashboard();
    }
  }

  login() {
    this.spinnerService.show();
    this.isDisableBtn = true;
    this.subscription.add(
      this.loginService.login(this.loginParam).subscribe((tokenModel: TokenModel) => {
        this.storageService.setUserToken(tokenModel.access_token);
        this.accountDetails();
      }, (error) => {
        this.alertService.error(error.error.message);
        this.isDisableBtn = false;
        this.spinnerService.hide();
      })
    );
  }

  accountDetails() {
    this.subscription.add(
      this.loginService.getAccountDetails().subscribe((res: AccountDetailsModel) => {
        this.setUserData(res);
        this.sharedService.isUserLoggedIn.next(true);
        this.sharedService.checkRoles();
        this.redirectToDashboard();
        this.isDisableBtn = false;
        this.isLoggedIn = true;
        this.spinnerService.hide();
      }, () => {
        this.isDisableBtn = false;
        this.spinnerService.hide();
      })
    );
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

  setUserData(data: AccountDetailsModel) {
    this.storageService.setUserId(data.id);
    this.storageService.setUserName(data.name);
    this.storageService.setUserEmail(data.email);
    this.storageService.setRole(data.roles.toString());
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
