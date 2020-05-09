import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegistrationModel} from "./registration.model";
import {AppConfig} from "../../app.config";
import {shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) { }

  singUp(registrationModel: RegistrationModel) {
    return this.httpClient.post(AppConfig.SIGN_UP_API, registrationModel).pipe(shareReplay());
  }

}
