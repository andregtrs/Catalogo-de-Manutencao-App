import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EquipamentosFormComponent } from './equipamentos-form/equipamentos-form.component'
import { EquipamentosListaComponent } from './equipamentos-lista/equipamentos-lista.component';
import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../auth.guard'


const routes: Routes = [
  { path : 'equipamentos' , component: LayoutComponent, 
    canActivate: [AuthGuard] ,children: [
    
    { path: 'form' , component: EquipamentosFormComponent },
    { path: 'form/:id' , component: EquipamentosFormComponent },
    { path: 'lista', component: EquipamentosListaComponent },
    { path: '', redirectTo : '/equipamentos/lista', pathMatch: 'full' }

  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipamentosRoutingModule { }