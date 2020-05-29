import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Complaint} from "../complaint.model";

@Component({
  selector: 'app-view-complaint-details-modal',
  templateUrl: './view-complaint-details-modal.component.html',
  styleUrls: ['./view-complaint-details-modal.component.scss']
})
export class ViewComplaintDetailsModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: Complaint
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
