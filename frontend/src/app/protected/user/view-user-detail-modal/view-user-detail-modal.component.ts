import {Component, Inject, OnInit} from '@angular/core';
import {User} from '../user.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {UserComponent} from '../user.component';

@Component({
  selector: 'app-view-user-detail-modal',
  templateUrl: './view-user-detail-modal.component.html',
  styleUrls: ['./view-user-detail-modal.component.scss']
})
export class ViewUserDetailModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) { }

  ngOnInit() {
  }

  closeModal(data: User = null) {
    this.dialogRef.close(data);
  }

}
