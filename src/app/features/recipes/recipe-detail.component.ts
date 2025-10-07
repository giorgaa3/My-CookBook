import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { RecipeService } from "../../core/services/recipe.service";
import { Recipe } from "../../core/models/recipe.model";

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.scss"]
})
export class RecipeDetailComponent {
  private api = inject(RecipeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  recipe?: Recipe;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.api.get(id).subscribe(r => this.recipe = r);
  }
  edit() { this.router.navigate(["/recipes/new"], { queryParams: { edit: this.recipe?.id } }); }
  del() { if (!this.recipe?.id) return; if (confirm("Delete this recipe?")) this.api.remove(this.recipe.id).subscribe(() => this.router.navigate(["/"])); }
}
