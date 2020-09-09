import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlaggedUserComponent} from './flagged-user.component';
import {CreateFlagComponent} from './create-flag/create-flag.component';
import {ViewFlagComponent} from './view-flag/view-flag.component';
import {MatDialogModule} from "@angular/material/dialog";
import {AlertModule} from "../../layout/alert/alert.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {SpinnerModule} from "../../layout/spinner/spinner.module";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {_MatMenuDirectivesModule, MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule} from "@angular/material/paginator";
import {RouterModule, Routes} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import {DeactivateModalComponent} from "./deactivate-modal/deactivate-modal.component";

export const routes: Routes = [
  {
    path: '',
    component: FlaggedUserComponent
  }
];


@NgModule({
  declarations: [
    FlaggedUserComponent,
    CreateFlagComponent,
    ViewFlagComponent,
    DeactivateModalComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatDialogModule,
    AlertModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    FlexModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    SpinnerModule,
    MatTableModule,
    MatSortModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    MatPaginatorModule,
    MatListModule
  ]
})
export class FlaggedUserModule {
}
