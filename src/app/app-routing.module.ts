import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChamadoService } from './chamado.service';
import { ChamadoComponent } from './chamado/chamado.component';
import { DetalheService } from './detalhe.service';

const routes: Routes = [
  {path: '', component: ChamadoComponent},
  {path: '**',  pathMatch: 'prefix', component: ChamadoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ChamadoService, DetalheService]
})
export class AppRoutingModule { }
