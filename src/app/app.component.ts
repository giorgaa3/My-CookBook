import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
  <header class="sticky top-0 z-50 bg-offwhite/80 backdrop-blur border-b">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <a routerLink="/" class="text-xl font-semibold text-charcoal">🍳 RecipeShare</a>
      <nav class="flex items-center gap-3">
        <a routerLink="/" class="px-3 py-2 rounded-lg hover:bg-gray-100">Home</a>
        <a routerLink="/recipes/new" class="px-3 py-2 rounded-lg bg-tomato text-white hover:opacity-95">Add Recipe</a>
      </nav>
    </div>
  </header>
  <main class="max-w-6xl mx-auto px-4 py-6">
    <router-outlet />
  </main>
  <footer class="border-t">
    <div class="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-500">© {{year}} RecipeShare</div>
  </footer>
  `,
})
export class AppComponent { year = new Date().getFullYear(); }
