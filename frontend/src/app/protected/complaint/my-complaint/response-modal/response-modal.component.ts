import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MyComplaintComponent} from "../my-complaint.component";
import {Complaint} from "../../complaint.model";

@Component({
  selector: 'app-response-modal',
  templateUrl: './response-modal.component.html',
  styleUrls: ['./response-modal.component.scss']
})
export class ResponseModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MyComplaintComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Complaint,
    ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
