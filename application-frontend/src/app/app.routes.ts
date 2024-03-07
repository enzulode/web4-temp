import { Routes } from '@angular/router'
import { HomeComponent } from './features/home/home.component'
import { authGuard } from "./core/guards/authGuard"
import { PanelComponent } from './features/panel/panel.component'
import { InfoComponent } from './features/info/info.component'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    title: 'Homepage',
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    title: 'Information',
    path: 'info',
    pathMatch: 'full',
    component: InfoComponent
  },
  {
    title: 'Control panel',
    path: 'panel',
    canActivate: [ authGuard ],
    pathMatch: 'full',
    component: PanelComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
