import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChamadoService } from './chamado.service';
import { DetalheService } from './detalhe.service';
import { ChamadoComponent } from './chamado/chamado.component';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    ChamadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [ChamadoService, DetalheService],
  bootstrap: [AppComponent]
})
export class AppModule { }
