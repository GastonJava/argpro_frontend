import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pathToFileURL } from 'url';
import { CrearComponent } from '../crear/component/crear.component';
import { LoginComponent } from '../login/component/login.component';

const routes: Routes = [
  
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    component: LoginComponent,
    outlet: '',

    /*
    children: [
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginModule), //data: {animation: 'experiencia'}
      },

      {
        path: 'crear',
        loadChildren: () => import('../crear/Crear.module').then(m => m.CrearModule), //data: {animation: 'experiencia'}
      },
    ]
    */
  },

  {
  path: 'crear',
  component: CrearComponent,
  },

  /*
  {
    path: 'crear',
    loadChildren: () => import('../crear/Crear.module').then(m => m.CrearModule), //data: {animation: 'experiencia'}
  },
  */
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModalRouting {}
//export const ModalRoutes = RouterModule.forChild(routes);