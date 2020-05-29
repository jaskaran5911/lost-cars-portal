import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Complaint} from "./complaint.model";
import {AppConfig} from "../../app.config";
import {toFormData} from "../../layout/file-upload/file-upload.utils";
import {FilterModel} from "../../shared/model/filter.model";

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private http: HttpClient) { }

  getFilteredComplaints(filter: FilterModel) {
    return this.http.get(AppConfig.COMPLAINT_API, {params: new HttpParams().set('q', JSON.stringify(filter))});
  }

  createComplaint(complaint: Complaint) {
    return this.http.post(AppConfig.COMPLAINT_API, complaint);
  }

  updateComplaint(complaint: Complaint) {
    return this.http.patch(AppConfig.COMPLAINT_API + '/' + complaint.id, complaint);
  }

  uploadFile(id: number, data) {
    return this.http.patch(
      AppConfig.COMPLAINT_UPLOAD_API + id,
      toFormData(data), {
        reportProgress: true,
        observe: 'events'
      }
    );
  }

}
