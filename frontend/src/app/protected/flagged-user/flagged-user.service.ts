import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AppConfig} from "../../app.config";
import {FilterModel} from "../../shared/model/filter.model";
import {FlaggedUser} from "./flagged-user.model";

@Injectable({
  providedIn: 'root'
})
export class FlaggedUserService {

  constructor(private http: HttpClient) { }

  createFlaggedUser(data: FlaggedUser) {
    return this.http.post(AppConfig.FLAGGED_USER_API, data);
  }

  getFilteredFlaggedUser(filter: FilterModel) {
    return this.http.get(AppConfig.FLAGGED_USER_API, {params: new HttpParams().set('q', JSON.stringify(filter))});
  }

}
