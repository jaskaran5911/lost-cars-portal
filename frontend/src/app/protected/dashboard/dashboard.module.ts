import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {dashboardRoutes} from './dashboard.route';
import {DashboardComponent} from './dashboard.component';
import {DashboardService} from './dashboard.service';
import { MatCardModule } from '@angular/material/card';
import {FormsModule} from "@angular/forms";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {Ng9OdometerModule} from "ng9-odometer";
import {ChartModule} from "angular-highcharts";


@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes),
    CommonModule,
    MatCardModule,
    FormsModule,
    FlexModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    Ng9OdometerModule,
    ChartModule
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule { }
