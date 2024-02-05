import { Routes } from "@angular/router";

export const postsRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./posts-form/posts-form.page').then(
        (m) => m.PostsFormPage
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./posts-detail/posts-detail.page').then(
        (m) => m.PostsDetailPage
      ),
    loadChildren: () => // Child (inner) routes
      import('./posts-detail/posts-detail.routes').then((m) => m.postsDetailRoutes),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./posts-form/posts-form.page').then(
        (m) => m.PostsFormPage
      ),
  }
];