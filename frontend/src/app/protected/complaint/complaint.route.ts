import { Routes } from '@angular/router';
import {CreateComplaintComponent} from "./create-complaint/create-complaint.component";
import {MyComplaintComponent} from "./my-complaint/my-complaint.component";
import {AllComplaintsComponent} from "./all-complaints/all-complaints.component";
import {RoleGuardService} from "../../shared/service/role-guard.service";
import {Roles} from "../../shared/constant";
import {RespondedComplaintsComponent} from "./responded-complaints/responded-complaints.component";

export const complaintRoutes: Routes = [
  {
    path: 'my',
    canActivate: [RoleGuardService],
    data: {roles: [Roles.ROLE_USER]},
    component: MyComplaintComponent
  },
  {
    path: 'all',
    canActivate: [RoleGuardService],
    data: {roles: [Roles.ROLE_POLICE_OFFICER, Roles.ROLE_ADMIN]},
    component: AllComplaintsComponent
  },
  {
    path: 'responded',
    canActivate: [RoleGuardService],
    data: {roles: [Roles.ROLE_POLICE_OFFICER]},
    component: RespondedComplaintsComponent
  },
  {
    path: 'create',
    component: CreateComplaintComponent
  }
];
