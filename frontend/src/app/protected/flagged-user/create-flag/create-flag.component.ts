import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../../layout/alert/alert.service";
import {StorageService} from "../../../shared/service/storage.service";
import {FlaggedUser} from "../flagged-user.model";
import {FlaggedUserService} from "../flagged-user.service";
import {Constant} from "../../../shared/constant";

@Component({
  selector: 'app-create-flag',
  templateUrl: './create-flag.component.html',
  styleUrls: ['./create-flag.component.scss']
})
export class CreateFlagComponent implements OnInit, OnDestroy {
  flaggedUserModel: FlaggedUser = new FlaggedUser();
  subscription: Subscription = new Subscription();
  isDisableBtn = false;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public userId: number,
    private flaggedUserService: FlaggedUserService,
    private alertService: AlertService,
    private storageService: StorageService
  ) {
  }

  ngOnInit() {
    this.flaggedUserModel.user = this.userId;
    this.flaggedUserModel.action = Constant.FLAGGED_USER_STATUS.PENDING;
    this.flaggedUserModel.last_updated_by = this.storageService.getUserName();
    this.flaggedUserModel.flagged_by = Number(this.storageService.getUserId());
  }

  saveFlaggedUser() {
    this.isDisableBtn = true;
    this.subscription.add(
      this.flaggedUserService.createFlaggedUser(this.flaggedUserModel).subscribe(() => {
        this.closeModal(true);
        this.isDisableBtn = false;
      }, (error) => {
        this.alertService.error(error.error.message);
        this.isDisableBtn = false;
      })
    );
  }

  closeModal(data: boolean = false) {
    this.dialogRef.close(data);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
