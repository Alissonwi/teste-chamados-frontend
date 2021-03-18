import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChamadoComponent } from './chamado.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ChamadoComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ChamadoModule { }
