import { Routes } from '@angular/router';

export const postsDetailRoutes: Routes = [
  {
    path: 'info',
    loadComponent: () =>
      import('./posts-info/posts-info.page').then(
        (m) => m.PostsInfoPage
      ),
  },
  {
    path: 'comments',
    loadComponent: () =>
      import('./posts-comments/posts-comments.page').then(
        (m) => m.PostsCommentsPage
      ),
  },
  {
    path: 'maps',
    loadComponent: () =>
      import('./posts-location/posts-location.page').then(
        (m) => m.PostLocationPage
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'info', // Por defecto
  },
];