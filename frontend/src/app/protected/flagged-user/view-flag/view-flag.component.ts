import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FlaggedUser} from "../flagged-user.model";
import {FlaggedUserComponent} from "../flagged-user.component";

@Component({
  selector: 'app-view-flag',
  templateUrl: './view-flag.component.html',
  styleUrls: ['./view-flag.component.scss']
})
export class ViewFlagComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FlaggedUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FlaggedUser
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
