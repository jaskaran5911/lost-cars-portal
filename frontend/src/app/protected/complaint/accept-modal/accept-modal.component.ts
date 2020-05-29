import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MyComplaintComponent} from "../my-complaint/my-complaint.component";
import {Complaint} from "../complaint.model";
import {Subscription} from "rxjs";
import {ComplaintService} from "../complaint.service";
import {AlertService} from "../../../layout/alert/alert.service";
import {StorageService} from "../../../shared/service/storage.service";
import {Constant} from "../../../shared/constant";
import {RespondedComplaintsComponent} from "../responded-complaints/responded-complaints.component";

@Component({
  selector: 'app-accept-modal',
  templateUrl: './accept-modal.component.html',
  styleUrls: ['./accept-modal.component.scss']
})
export class AcceptModalComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  isDisableBtn = false;

  constructor(
    public dialogRef: MatDialogRef<MyComplaintComponent | RespondedComplaintsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Complaint,
    private alertService: AlertService,
    private storageService: StorageService,
    private complaintService: ComplaintService
  ) { }

  ngOnInit(): void {}

  acceptComplaint() {
    this.data.responded_by = this.storageService.getUserId();
    this.data.complaint_status = Constant.COMPLAINT_STATUS.ACCEPTED;
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
