import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateComplaintComponent} from "./create-complaint/create-complaint.component";
import {RouterModule} from "@angular/router";
import {complaintRoutes} from "./complaint.route";
import {MatCardModule} from "@angular/material/card";
import {FlexModule} from "@angular/flex-layout";
import {MatDividerModule} from "@angular/material/divider";
import {MatStepperModule} from "@angular/material/stepper";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {SpinnerModule} from "../../layout/spinner/spinner.module";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {AlertModule} from "../../layout/alert/alert.module";
import {FileUploadModule} from "../../layout/file-upload/file-upload.module";
import { MyComplaintComponent } from './my-complaint/my-complaint.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule} from "@angular/material/paginator";
import {DateAgoPipe} from "../../shared/pipe/date-ago.pipe";
import { ResponseModalComponent } from './my-complaint/response-modal/response-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import { AllComplaintsComponent } from './all-complaints/all-complaints.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { AcceptModalComponent } from './accept-modal/accept-modal.component';
import { ViewComplaintDetailsModalComponent } from './view-complaint-details-modal/view-complaint-details-modal.component';
import {MatListModule} from "@angular/material/list";
import { RespondedComplaintsComponent } from './responded-complaints/responded-complaints.component';
import { StatusModalComponent } from './status-modal/status-modal.component';
import {CommentModule} from "../comment/comment.module";


@NgModule({
  declarations: [
    CreateComplaintComponent,
    MyComplaintComponent,
    DateAgoPipe,
    ResponseModalComponent,
    AllComplaintsComponent,
    AcceptModalComponent,
    ViewComplaintDetailsModalComponent,
    RespondedComplaintsComponent,
    StatusModalComponent
  ],
  exports: [
    DateAgoPipe
  ],
  imports: [
    RouterModule.forChild(complaintRoutes),
    CommonModule,
    MatCardModule,
    FlexModule,
    MatDividerModule,
    MatStepperModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    SpinnerModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    AlertModule,
    FileUploadModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTooltipModule,
    MatListModule,
    CommentModule
  ]
})
export class ComplaintModule { }
