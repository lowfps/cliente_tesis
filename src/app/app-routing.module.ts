import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { PagenotnofundComponent } from './pagenotnofund/pagenotnofund.component';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path:'dashboard',
    loadChildren: () => import('./private/private.module').then( m => m.PrivateModule ),
    canActivate: [ AuthGuard ],
  },
  {
    path:'**',
    component: PagenotnofundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
