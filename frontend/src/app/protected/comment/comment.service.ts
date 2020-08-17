import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AppConfig} from "../../app.config";
import {FilterModel} from "../../shared/model/filter.model";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  createComment(data) {
    return this.http.post(AppConfig.COMMENT_API, data);
  }

  getFilteredComments(filter: FilterModel) {
    return this.http.get(AppConfig.COMMENT_API, {params: new HttpParams().set('q', JSON.stringify(filter))});
  }

}
