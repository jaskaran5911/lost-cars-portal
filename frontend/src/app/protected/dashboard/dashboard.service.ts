import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {FilterModel} from "../../shared/model/filter.model";
import {AppConfig} from "../../app.config";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getComplaintEval(filter: FilterModel) {
    return this.http.get(AppConfig.COMPLAINT_EVAL_API, {params: new HttpParams().set('q', JSON.stringify(filter))});
  }

  getFlaggedUserEval(filter: FilterModel) {
    return this.http.get(AppConfig.FLAGGED_USER_EVAL_API, {params: new HttpParams().set('q', JSON.stringify(filter))});
  }

  getUserEval(filter: FilterModel) {
    return this.http.get(AppConfig.USER_EVAL_API, {params: new HttpParams().set('q', JSON.stringify(filter))});
  }

  getCommentEval(filter: FilterModel) {
    return this.http.get(AppConfig.COMMENT_EVAL_API, {params: new HttpParams().set('q', JSON.stringify(filter))});
  }

  getComplaintCount() {
    return this.http.get(AppConfig.COMPLAINT_STATUS_COUNT_API);
  }

  getUserRoleCount() {
    return this.http.get(AppConfig.USER_ROLE_COUNT_API);
  }

}
