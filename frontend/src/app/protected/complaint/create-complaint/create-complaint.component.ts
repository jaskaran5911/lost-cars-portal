import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {requiredFileType} from "../../../layout/file-upload/upload-file-validators";
import {Constant} from "../../../shared/constant";
import {toResponseBody, uploadProgress} from "../../../layout/file-upload/file-upload.utils";
import {SpinnerService} from "../../../shared/service/spinner.service";
import {AlertService} from "../../../layout/alert/alert.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AppConfig} from "../../../app.config";
import {Complaint} from "../complaint.model";
import {ComplaintService} from "../complaint.service";
import {MatStepper} from "@angular/material/stepper";
import {StorageService} from "../../../shared/service/storage.service";

@Component({
  selector: 'app-create-complaint',
  templateUrl: './create-complaint.component.html',
  styleUrls: ['./create-complaint.component.scss']
})
export class CreateComplaintComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  complaint: Complaint = new Complaint();

  progress = 0;
  personalDetailsStep = false;
  complaintStep = false;

  uploadFile = new FormGroup({
    file: new FormControl(null,
      [Validators.required, requiredFileType(Constant.UPLOAD_ALLOWED_FILE_FORMAT)]
    )
  });

  constructor(
    public spinnerService: SpinnerService,
    private alertService: AlertService,
    private snackBar: MatSnackBar,
    private router: Router,
    private complaintService: ComplaintService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.complaint.complaint_by = this.storageService.getUserId();
    this.complaint.last_updated_by = this.storageService.getUserName();
  }

  complaintDetails(stepper: MatStepper) {
    this.personalDetailsStep = true;
    setTimeout(() => {
      stepper.next();
    });
  }

  createComplaint(stepper: MatStepper) {
    this.spinnerService.show();
    this.complaintStep = true;
    this.subscription.add(
      this.complaintService.createComplaint(this.complaint).subscribe((res: Complaint) => {
        this.complaint = res;
        this.spinnerService.hide();
        stepper.next();
      }, () => {
        this.complaintStep = false;
        this.spinnerService.hide();
      })
    );
  }

  fileUpload() {
    if (this.uploadFile.valid) {
      this.spinnerService.show();
      this.subscription.add(
        this.complaintService.uploadFile(this.complaint.id, this.uploadFile.value)
          .pipe(
            uploadProgress(progress => (this.progress = progress)),
            toResponseBody()
          )
          .subscribe(() => {
            this.progress = 0;
            this.spinnerService.hide();
            this.successFn();
          })
      );
    } else {
      this.successFn();
    }
  }

  hasError(field: string, error: string) {
    const control = this.uploadFile.get(field);
    const isError = control.dirty && control.hasError(error);
    if (isError) {
      this.alertService.error('Only Supported file format are ' + Constant.UPLOAD_ALLOWED_FILE_FORMAT);
    } else {
      this.alertService.close();
    }
    return isError;
  }

  successFn() {
    this.snackBar.open('Successfully submitted');
    this.router.navigate([AppConfig.MY_COMPLAINT]).then();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
