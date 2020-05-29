import {Component, OnDestroy, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {AlertService} from "../../layout/alert/alert.service";
import {StorageService} from "../../shared/service/storage.service";
import {SpinnerService} from "../../shared/service/spinner.service";
import {User} from "../../protected/user/user.model";
import {UserService} from "../../protected/user/user.service";


@Component({
  selector: 'app-add-staff-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss']
})
export class EditProfileModalComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  user: User = new User();
  isDisableBtn = false;

  constructor(
    public dialogRef: MatDialogRef<any>,
    public userService: UserService,
    private alertService: AlertService,
    public spinnerService: SpinnerService,
    private storageService: StorageService
  ) {
    this.spinnerService.show();
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.subscription.add(
      this.userService.getUser(Number(this.storageService.getUserId())).subscribe((res: User) => {
        this.user = res;
        this.spinnerService.hide();
      })
    );
  }

  saveUser() {
    this.isDisableBtn = true;
    this.user.last_updated_by = this.storageService.getUserName();
    this.subscription.add(
      this.userService.updateUser(this.user).subscribe(() => {
        this.storageService.setUserName(this.user.name);
        this.storageService.setUserEmail(this.user.email);
        this.closeModal();
        this.isDisableBtn = false;
      }, (error) => {
        this.alertService.error(error.error.message);
        this.isDisableBtn = false;
      })
    );
  }

  closeModal() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
