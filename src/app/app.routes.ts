import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/feed', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component')
      .then(m => m.RegisterComponent)
  },
  {
    path: 'feed',
    loadComponent: () => import('./features/feed/feed.component')
      .then(m => m.FeedComponent),
    canActivate: [authGuard]
  },
  {
    path: 'phrases',
    loadComponent: () => import('./features/phrases/phrase-list/phrase-list.component')
      .then(m => m.PhraseListComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/feed' }
];
