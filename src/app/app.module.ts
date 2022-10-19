import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {MatBadgeModule} from '@angular/material/badge'; 
import {MatButtonModule} from '@angular/material/button'; 

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { EducacionComponent } from './educacion/educacion.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { HardsoftComponent } from './hardsoft/hardsoft.component';
import { FooterComponent } from './footer/footer.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragndroptestingComponent } from './dragndroptesting/dragndroptesting.component';
import { DialogComponent } from './share/services/proyecto/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogModule } from './share/services/proyecto/dialog/dialog.module';
import { MaterialModule } from './material.module';
import { FootercontactComponent } from './footercontact/footercontact/footercontact.component';
import { NgProgressModule } from 'ngx-progressbar';
import { ProgressbarComponent } from './hardsoft/test_progressbar/progressbar/progressbar.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { ModalModule } from './usuarioform/modal/modal.module';
import { ModalService } from './share/services/modal/ismodalopen.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertaComponent } from './alerta/alerta.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared.module';
import { SobremiComponent } from './sobremi/component/sobremi.component';
import { SobremiModule } from './sobremi/sobremi.module';

@NgModule({
  declarations: [	
    AppComponent,
    HeaderComponent,

    ExperienciaComponent,
    EducacionComponent,
    ProyectoComponent,
    HardsoftComponent,
    FooterComponent,
    DragndroptestingComponent,
    ProgressbarComponent,
    FootercontactComponent,
    AlertaComponent,
   
    
   ],
  imports: [
    FormsModule,
    SharedModule,
    BrowserModule,
    RouterModule,
    SharedModule,
    NgxSpinnerModule,
    NoopAnimationsModule,
    DragDropModule,
    MatSlideToggleModule,
    SobremiModule,

    /*
    MatBadgeModule,
    MatButtonModule,
    MatDialogModule,
    */

    DialogModule,
    MaterialModule,
    ScrollingModule,
    ModalModule,
    AppRoutingModule,
    HttpClientModule 
  ],
  providers: [ModalService],
  bootstrap: [AppComponent],
  exports: [ ]
})
export class AppModule { }