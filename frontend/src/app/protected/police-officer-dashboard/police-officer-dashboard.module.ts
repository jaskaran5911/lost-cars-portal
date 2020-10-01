import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {policeOfficerDashboardRoutes} from "./police-officer-dashboard.route";
import {PoliceOfficerDashboardComponent} from "./police-officer-dashboard.component";
import {PoliceOfficerDashboardService} from "./police-officer-dashboard.service";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {FlexModule} from "@angular/flex-layout";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {Ng9OdometerModule} from "ng9-odometer";
import {ChartModule} from "angular-highcharts";



@NgModule({
  declarations: [
    PoliceOfficerDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(policeOfficerDashboardRoutes),
    MatCardModule,
    FormsModule,
    FlexModule,
    MatDividerModule,
    MatIconModule,
    Ng9OdometerModule,
    ChartModule
  ],
  providers: [
    PoliceOfficerDashboardService
  ]
})
export class PoliceOfficerDashboardModule { }
