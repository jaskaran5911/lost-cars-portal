import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Role, RoleModel, User} from '../user.model';
import {UserComponent} from '../user.component';
import {UserService} from '../user.service';
import {Subscription} from 'rxjs';
import {StorageService} from '../../../shared/service/storage.service';
import {AlertService} from '../../../layout/alert/alert.service';


@Component({
  selector: 'app-add-user-modal',
  templateUrl: './save-user-modal.component.html',
  styleUrls: ['./save-user-modal.component.scss']
})
export class SaveUserModalComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  user: User = new User();
  roles: Role[];
  isEdit = false;
  isDisableBtn = false;

  constructor(
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    public userService: UserService,
    private alertService: AlertService,
    private storageService: StorageService
  ) {
  }

  ngOnInit() {
    this.getRoles();
    if (this.data) {
      this.user = this.data;
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
  }

  getRoles() {
    this.subscription.add(
      this.userService.getRoles().subscribe((res: RoleModel) => {
        this.roles = res.objects;
      })
    );
  }

  saveUser() {
    this.isDisableBtn = true;
    this.user.last_updated_by = this.storageService.getUserName();
    if (this.data) {
      this.editUser();
    } else {
      this.addUser();
    }
  }

  addUser() {
    this.subscription.add(
      this.userService.addUser(this.user).subscribe(() => {
        this.closeModal(true);
        this.isDisableBtn = false;
      }, (error) => {
        this.alertService.error(error.error.message);
        this.isDisableBtn = false;
      })
    );
  }

  editUser() {
    this.subscription.add(
      this.userService.updateUser(this.user).subscribe(() => {
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

  compareFn(r1: Role, r2: Role) {
    return r1 && r2 ? r1.id === r2.id : r1 === r2;
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
