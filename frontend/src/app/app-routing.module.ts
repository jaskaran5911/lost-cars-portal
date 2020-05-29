import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AuthGuardService} from "./shared/service/auth-guard.service";
import {RoleGuardService} from "./shared/service/role-guard.service";
import {Roles} from "./shared/constant";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'dashboard',
        canActivate: [RoleGuardService],
        data: {roles: [Roles.ROLE_ADMIN]},
        loadChildren: () => import('./protected/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'user-dashboard',
        loadChildren: () => import('./protected/user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule)
      },
      {
        path: 'police-officer-dashboard',
        canActivate: [RoleGuardService],
        data: {roles: [Roles.ROLE_POLICE_OFFICER]},
        loadChildren: () => import('./protected/police-officer-dashboard/police-officer-dashboard.module').then(m => m.PoliceOfficerDashboardModule)
      },
      {
        path: 'user',
        canActivate: [RoleGuardService],
        data: {roles: [Roles.ROLE_ADMIN]},
        loadChildren: () => import('./protected/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'complaint',
        loadChildren: () => import('./protected/complaint/complaint.module').then(m => m.ComplaintModule)
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'main'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
