import {Component, Inject, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CommentsModel} from "../comment.model";
import {RolesModel} from "../../../shared/model/roles.model";
import {Filter, FilterModel, OrderBy} from "../../../shared/model/filter.model";
import {Constant} from "../../../shared/constant";
import {AppConfig} from "../../../app.config";
import {CommentService} from "../comment.service";

@Component({
  selector: 'app-view-comment',
  templateUrl: './view-comment.component.html',
  styleUrls: ['./view-comment.component.scss']
})
export class ViewCommentComponent implements OnInit {
  subscription: Subscription = new Subscription();
  commentsModel: CommentsModel = new CommentsModel();
  filterModel: FilterModel = new FilterModel();
  loggedInRoles: RolesModel = new RolesModel();
  USER_URL = AppConfig.USER;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private commentService: CommentService
  ) {
    this.filterModel.filters.push(new Filter(Constant.COMPLAINT, Constant.EQ, this.data));
    this.filterModel.order_by.push(new OrderBy(Constant.UPDATED_AT, Constant.DESC));
  }

  ngOnInit(): void {
    this.getComments();
  }

  getComments(): void {
    this.subscription.add(this.commentService.getFilteredComments(this.filterModel).subscribe((res: CommentsModel) => {
      this.commentsModel = res;
    }));
  }

  getUserURLForID(id: number) {
    return {q: JSON.stringify(new Filter(Constant.ID, Constant.EQ, id))};
  }

  closeModal() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
