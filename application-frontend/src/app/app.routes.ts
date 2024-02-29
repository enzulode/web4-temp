import { Routes } from '@angular/router';
import { HomeComponent } from "./features/home/home.component";
import { authGuard } from "./core/guards/authGuard";
import { PanelComponent } from "./features/panel/panel.component";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    title: 'L4-WEB Andreev V.A.',
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    title: 'Point hit panel',
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

