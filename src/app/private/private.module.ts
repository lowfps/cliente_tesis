import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ShareModule } from '../share/share.module';
import { MaterialModule } from '../material/material.module';
import { UploadFileComponent } from './pages/upload-file/upload-file.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TableFileComponent } from './pages/components/table-file/table-file.component';
import { TypeResourcePipe } from './pipes/type-resource.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { EditFileComponent } from './pages/edit-file/edit-file.component';
import { AcademyProgramComponent } from './pages/academy-program/academy-program.component';
import { AcademyDialogComponent } from './pages/components/academy-dialog/academy-dialog.component';


@NgModule({
  declarations: [
    PrivateComponent,
    DashboardComponent,
    ProfileComponent,
    UploadFileComponent,
    TableFileComponent,
    TypeResourcePipe,
    StatusPipe,
    EditFileComponent,
    AcademyProgramComponent,
    AcademyDialogComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    ShareModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class PrivateModule { }
