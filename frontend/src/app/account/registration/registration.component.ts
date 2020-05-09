import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {SharedService} from "../../shared/service/shared.service";
import {StorageService} from "../../shared/service/storage.service";
import {AlertService} from "../../layout/alert/alert.service";
import {SpinnerService} from "../../shared/service/spinner.service";
import {Router} from "@angular/router";
import {AppConfig} from "../../app.config";
import {RegistrationModel, SignUpResponse} from "./registration.model";
import {RegistrationService} from "./registration.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Messages} from "../../shared/constant";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registrationModel: RegistrationModel = new RegistrationModel();
  subscription: Subscription = new Subscription();
  isDisableBtn = false;
  isLoggedIn = false;

  constructor(
    private sharedService: SharedService,
    private storageService: StorageService,
    private alertService: AlertService,
    public spinnerService: SpinnerService,
    private registrationService: RegistrationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.isLoggedIn && this.storageService.getUserToken()) {
      this.router.navigate([AppConfig.LOGIN]).then();
    }
  }

  signUp() {
    if (this.registrationModel.password === this.registrationModel.cPassword) {
      this.spinnerService.show();
      this.isDisableBtn = true;
      this.subscription.add(
        this.registrationService.singUp(this.registrationModel).subscribe((res: SignUpResponse) => {
          this.router.navigate([AppConfig.LOGIN]).then();
          this.snackBar.open(res.message);
          this.isDisableBtn = false;
          this.isLoggedIn = true;
          this.spinnerService.hide();
        }, (error) => {
          this.alertService.error(error.error.message);
          this.isDisableBtn = false;
          this.spinnerService.hide();
        })
      );
    } else {
      this.snackBar.open(Messages.PASSWORD_NOT_MATCHED);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
