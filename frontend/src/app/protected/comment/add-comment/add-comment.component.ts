import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../../layout/alert/alert.service";
import {StorageService} from "../../../shared/service/storage.service";
import {CommentService} from "../comment.service";
import {CommentModel} from "../comment.model";

@Component({
  selector: 'app-action-modal',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  commentModel: CommentModel = new CommentModel();
  isDisableBtn = false;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private commentService: CommentService,
    private alertService: AlertService,
    private storageService: StorageService
  ) {
  }

  ngOnInit() {
    this.commentModel.complaint = this.data;
    this.commentModel.last_updated_by = this.storageService.getUserName();
    this.commentModel.commented_by = Number(this.storageService.getUserId());
  }

  saveComment() {
    this.isDisableBtn = true;
    this.subscription.add(
      this.commentService.createComment(this.commentModel).subscribe(() => {
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
