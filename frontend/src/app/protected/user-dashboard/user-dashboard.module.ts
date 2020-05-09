import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserDashboardComponent} from "./user-dashboard.component";
import {RouterModule} from "@angular/router";
import {userDashboardRoutes} from "./user-dashboard.route";
import {UserDashboardService} from "./user-dashboard.service";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(userDashboardRoutes),
    MatCardModule,
    FormsModule
  ],
  providers: [
    UserDashboardService
  ]
})
export class UserDashboardModule { }
