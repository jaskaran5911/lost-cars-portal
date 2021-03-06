import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../../app.config";

@Injectable({
  providedIn: 'root'
})
export class UserDashboardService {

  constructor(private http: HttpClient) { }

  getMyComplaintCount(id: number) {
    return this.http.get(AppConfig.COMPLAINT_COUNT_API + '/complaint_by/' + id);
  }

  getComplaintStatusCount(id: number, complaint_status: string) {
    return this.http.get(AppConfig.COMPLAINT_STATUS_COUNT_API + '/complaint_by/' + complaint_status + '/' + id);
  }


  getComplaintCount(id: number) {
    return this.http.get(AppConfig.COMPLAINT_STATUS_COUNT_API + '/complaint_by/' + id);
  }

}
