import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <div class="text-center py-24">
      <div class="text-7xl">🥣</div>
      <h1 class="text-2xl font-semibold mt-2">Page not found</h1>
      <p class="text-gray-600">Try going back to the home page.</p>
    </div>
  `
})
export class NotFoundComponent {}
