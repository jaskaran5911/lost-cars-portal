import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MyComplaintComponent} from "../my-complaint/my-complaint.component";
import {RespondedComplaintsComponent} from "../responded-complaints/responded-complaints.component";
import {Complaint} from "../complaint.model";
import {AlertService} from "../../../layout/alert/alert.service";
import {StorageService} from "../../../shared/service/storage.service";
import {ComplaintService} from "../complaint.service";
import {Constant} from "../../../shared/constant";

@Component({
  selector: 'app-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.scss']
})
export class StatusModalComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  COMPLAINT_STATUS = Constant.COMPLAINT_STATUS;
  isDisableBtn = false;

  constructor(
    public dialogRef: MatDialogRef<MyComplaintComponent | RespondedComplaintsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Complaint,
    private alertService: AlertService,
    private storageService: StorageService,
    private complaintService: ComplaintService
  ) { }

  ngOnInit(): void {}

  updateStatusComplaint() {
    this.data.responded_by = this.storageService.getUserId();
    this.data.last_updated_by = this.storageService.getUserName();

    this.subscription.add(
      this.complaintService.updateComplaint(this.data).subscribe(() => {
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
