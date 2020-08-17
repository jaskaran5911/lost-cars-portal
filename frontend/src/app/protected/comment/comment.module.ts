import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddCommentComponent} from "./add-comment/add-comment.component";
import {MatDialogModule} from "@angular/material/dialog";
import {AlertModule} from "../../layout/alert/alert.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    AddCommentComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    AlertModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSlideToggleModule,
    FlexModule,
    MatButtonModule
  ]
})
export class CommentModule { }
