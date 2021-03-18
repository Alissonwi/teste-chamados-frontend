import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

import { ChamadoComponent } from "./chamado/chamado.component"

const APP_ROUTES: Routes = [
    {path: '', component: ChamadoComponent}
    
]

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(APP_ROUTES, {onSameUrlNavigation: 'reload'});