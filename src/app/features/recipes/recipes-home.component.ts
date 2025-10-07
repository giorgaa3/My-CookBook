import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { RecipeService } from "../../core/services/recipe.service";
import { Recipe } from "../../core/models/recipe.model";

@Component({
  standalone: true,
  selector: "app-recipes-home",
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: "./recipes-home.component.html",
  styleUrls: ["./recipes-home.component.scss"]
})
export class RecipesHomeComponent {
  private api = inject(RecipeService);
  recipes: Recipe[] = [];
  loading = true;
  query = "";

  ngOnInit() { this.fetch(); }
  fetch() { this.loading = true; this.api.list(this.query).subscribe(rs => { this.recipes = rs; this.loading = false; }); }
  toggleFav(r: Recipe, ev: Event) { ev.preventDefault(); this.api.toggleFavorite(r.id!, !r.favorite).subscribe(u => r.favorite = u.favorite); }
}
