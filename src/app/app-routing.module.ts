import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { MainDataComponent } from './pages/servicios/main-data/main-data.component';
import { FormRestauranteComponent } from './pages/servicios/form-restaurante/form-restaurante.component';
import { FormEventosComponent } from './pages/servicios/form-eventos/form-eventos.component';
import { FormCampingComponent } from './pages/servicios/form-camping/form-camping.component';
import { EntradasComponent } from './pages/servicios/form-restaurante/entradas/entradas.component';
import { PlatosComponent } from './pages/servicios/form-restaurante/platos/platos.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { MostrarPedidoComponent } from './pages/consulta/mostrar-pedido/mostrar-pedido.component';
import { DatosReservaComponent } from './pages/servicios/main-data/datos-reserva/datos-reserva.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { MainCafeComponent } from './pages/cafe/main-cafe/main-cafe.component';
import { CafeDetalleComponent } from './pages/cafe/cafe-detalle/cafe-detalle.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  {path:'home', component: HomeComponent},
  {path:'servicios', component: ServiciosComponent},
  {path:'main-data', component: MainDataComponent},
  {path:'reservas', component: DatosReservaComponent},
  {path:'restaurante', component: FormRestauranteComponent},
  {path:'eventos', component: FormEventosComponent},
  {path:'camping', component: FormCampingComponent},
  {path: 'entradas', component: EntradasComponent},
  {path: 'platos', component: PlatosComponent},
  {path: 'consulta', component:ConsultaComponent},
  {path: 'mostrar', component:MostrarPedidoComponent},
  {path:'nosotros', component: NosotrosComponent},
  {path:'cafe', component: MainCafeComponent},
  {path:'cafe/detalle/:id', component: CafeDetalleComponent},
  {path:'**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
