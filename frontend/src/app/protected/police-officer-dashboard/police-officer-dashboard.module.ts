import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {policeOfficerDashboardRoutes} from "./police-officer-dashboard.route";
import {PoliceOfficerDashboardComponent} from "./police-officer-dashboard.component";
import {PoliceOfficerDashboardService} from "./police-officer-dashboard.service";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    PoliceOfficerDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(policeOfficerDashboardRoutes),
    MatCardModule,
    FormsModule
  ],
  providers: [
    PoliceOfficerDashboardService
  ]
})
export class PoliceOfficerDashboardModule { }
