import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {AlertService} from "../../../layout/alert/alert.service";
import {FlaggedUserComponent} from "../flagged-user.component";
import {UserService} from "../../user/user.service";
import {Active} from "../../../shared/model/active.model";

@Component({
  selector: 'app-accept-modal',
  templateUrl: './deactivate-modal.component.html',
  styleUrls: ['./deactivate-modal.component.scss']
})
export class DeactivateModalComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  isDisableBtn = false;

  constructor(
    public dialogRef: MatDialogRef<FlaggedUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  ngOnInit(): void {}

  deactivateUser() {
    this.subscription.add(
      this.userService.toggleStatusUser(this.data, new Active(false)).subscribe(() => {
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
