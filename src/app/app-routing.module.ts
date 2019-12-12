import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { FormComponent } from './pages/clientes/form.component';
import { DirectivasComponent } from './pages/directivas/directivas.component';


const routes: Routes = [
  {path:'', redirectTo:'/clientes', pathMatch:'full'},
  {path:'clientes', component:ClientesComponent},
  {path:'clientes/form', component:FormComponent},
  {path:'clientes/form/:id', component:FormComponent},
  {path:'directivas', component:DirectivasComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
