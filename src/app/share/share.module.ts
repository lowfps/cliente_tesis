import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebardComponent } from './sidebard/sidebard.component';
import { FooterComponent } from './footer/footer.component';
import { AuthModule } from '../auth/auth.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SidebardComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    RouterModule
  ],
  exports: [
    SidebardComponent,
    FooterComponent
  ]
})
export class ShareModule { }
