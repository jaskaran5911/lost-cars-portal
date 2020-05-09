import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedService} from './service/shared.service';
import {ProgressBarService} from './service/progress-bar.service';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    SharedService,
    ProgressBarService
  ]
})
export class SharedModule { }
