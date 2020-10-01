import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserDashboardComponent} from "./user-dashboard.component";
import {RouterModule} from "@angular/router";
import {userDashboardRoutes} from "./user-dashboard.route";
import {UserDashboardService} from "./user-dashboard.service";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {FlexModule} from "@angular/flex-layout";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {Ng9OdometerModule} from "ng9-odometer";
import {ChartModule} from "angular-highcharts";



@NgModule({
  declarations: [
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(userDashboardRoutes),
    MatCardModule,
    FormsModule,
    FlexModule,
    MatDividerModule,
    MatIconModule,
    Ng9OdometerModule,
    ChartModule
  ],
  providers: [
    UserDashboardService
  ]
})
export class UserDashboardModule { }
