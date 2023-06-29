import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditFileComponent } from './pages/edit-file/edit-file.component';
import { UploadFileComponent } from './pages/upload-file/upload-file.component';
import { AcademyProgramComponent } from './pages/academy-program/academy-program.component';


const childRoutes: Routes = [

  { path: '', component: DashboardComponent, title: 'Lista de Documentos' },
  { path: 'upload', component: UploadFileComponent, title: 'Subir Documentos' },
  { path: 'edit/:cod_programa', component: EditFileComponent, title: 'Actualizar Documentos' },
  { path: 'add-academy-program', component: AcademyProgramComponent, title: 'Agregar Programa Académico' }
]

@NgModule({
	imports: [ RouterModule.forChild( childRoutes ) ],
	exports: [ RouterModule ]
})
export class ChildrenRoutingModule { }
