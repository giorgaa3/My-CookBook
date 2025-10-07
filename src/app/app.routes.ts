import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/recipes/recipes-home.component').then(m => m.RecipesHomeComponent) },
  { path: 'recipes/new', loadComponent: () => import('./features/recipes/recipe-form.component').then(m => m.RecipeFormComponent) },
  { path: 'recipes/:id', loadComponent: () => import('./features/recipes/recipe-detail.component').then(m => m.RecipeDetailComponent) },
  { path: '**', loadComponent: () => import('./shared/not-found.component').then(m => m.NotFoundComponent) }
];
