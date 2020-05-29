import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AppConfig} from '../../app.config';
import {User} from './user.model';
import {Active} from '../../shared/model/active.model';
import {FilterModel} from "../../shared/model/filter.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(AppConfig.USER_API);
  }

  getUser(id: number) {
    return this.http.get(AppConfig.USER_API + '/' + id);
  }

  getFilteredUsers(filter: FilterModel) {
    return this.http.get(AppConfig.USER_API, {params: new HttpParams().set('q', JSON.stringify(filter))});
  }

  addUser(user: User) {
    return this.http.post(AppConfig.USER_API, user);
  }

  updateUser(user: User) {
    return this.http.put(AppConfig.USER_API + '/' + user.id, user);
  }

  toggleStatusUser(id: number, active: Active) {
    return this.http.patch(AppConfig.USER_API + '/' + id, active);
  }

  getRoles() {
    return this.http.get(AppConfig.ROLE_API);
  }

}
