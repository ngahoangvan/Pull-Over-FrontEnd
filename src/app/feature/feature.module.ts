import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharesModule } from '../shares/shares.module';
import { FeatureRoutingModule } from './feature-routing.module';
import { HomeComponent } from './home/home.component';
import { ForYouComponent } from './for-you/for-you.component';
import { RouterModule } from '@angular/router';
import { FeatureComponent } from './feature.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FeatureComponent,
    HomeComponent,
    ForYouComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharesModule,
    FeatureRoutingModule,
    RouterModule,
    DragDropModule,
    TextareaAutosizeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FeatureModule { }
