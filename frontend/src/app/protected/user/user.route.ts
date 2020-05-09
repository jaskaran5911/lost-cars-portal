import { Routes } from '@angular/router';
import {UserComponent} from './user.component';
import {SaveUserModalComponent} from './save-user-modal/save-user-modal.component';
import {ViewUserDetailModalComponent} from './view-user-detail-modal/view-user-detail-modal.component';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserComponent
  },
  {
    path: 'add',
    component: SaveUserModalComponent
  },
  {
    path: 'view',
    component: ViewUserDetailModalComponent
  }
];
