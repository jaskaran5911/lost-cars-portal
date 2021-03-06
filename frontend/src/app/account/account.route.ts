import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from "./registration/registration.component";

export const accountRoute: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  }
];
