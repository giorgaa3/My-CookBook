import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators, FormArray, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RecipeService } from "../../core/services/recipe.service";
import { Recipe } from "../../core/models/recipe.model";

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./recipe-form.component.html",
  styleUrls: ["./recipe-form.component.scss"]
})
export class RecipeFormComponent {
  private fb = inject(FormBuilder);
  private api = inject(RecipeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEdit = false;
  editId?: number;
  preview: string | null = null;

  form = this.fb.nonNullable.group({
    title: this.fb.nonNullable.control("", [Validators.required, Validators.minLength(3)]),
    description: this.fb.nonNullable.control("", [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
    ingredients: this.fb.array<FormControl<string>>([
      this.fb.nonNullable.control("", Validators.required)
    ]),
    instructions: this.fb.nonNullable.control("", [Validators.required, Validators.minLength(10)]),
    thumbnail: this.fb.nonNullable.control("", [Validators.required])
  });

  get ings(): FormArray<FormControl<string>> { return this.form.controls.ingredients; }
  fc(k: keyof typeof this.form.controls) { return this.form.controls[k]; }

  ngOnInit() {
    const edit = this.route.snapshot.queryParamMap.get("edit");
    if (edit) {
      this.isEdit = true; this.editId = Number(edit);
      this.api.get(this.editId).subscribe(r => {
        this.form.patchValue({
          title: r.title,
          description: r.description,
          instructions: r.instructions,
          thumbnail: r.thumbnail
        });
        this.ings.clear();
        r.ingredients.forEach(i => this.ings.push(this.fb.nonNullable.control(i, Validators.required)));
        this.preview = r.thumbnail;
      });
    }
  }

  addIng() { this.ings.push(this.fb.nonNullable.control("", Validators.required)); }
  removeIng(i: number) { this.ings.removeAt(i); }

  onFile(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
      this.form.patchValue({ thumbnail: this.preview });
    };
    reader.readAsDataURL(file);
  }

  private sanitizePayload(raw: any): Recipe {
    // ???? base64 ??? (>100KB), json-server ???????? ????????.
    let thumb = 'assets/seed/pizza.jpg';
    if (typeof thumb === "string" && thumb.startsWith("data:") && thumb.length > 100_000) {
      // ?????????? ??????????: ?? ????????? ???? base64. ??????? seed ?????? ?? ???????.
      thumb = "assets/seed/pizza.jpg";
    }
    return {
      title: raw.title,
      description: raw.description,
      ingredients: raw.ingredients as string[],
      instructions: raw.instructions,
      thumbnail: thumb,
      favorite: false
    };
    // ?????????????: thumbnail-?? ????????? ???????? ???????? ???????????
  }

  onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const raw = this.form.getRawValue();
    const payload = this.sanitizePayload(raw);

    const next$ = this.isEdit && this.editId
      ? this.api.update(this.editId, payload)
      : this.api.create(payload);

    next$.subscribe({
      next: () => {
        // Success ? ?????? ??????? ?? ??????? ???????? ??????? ???????????
        this.router.navigate(["/"]);
      },
      error: (err) => {
        console.error("CREATE/UPDATE FAILED:", err);
        alert("?????? ??????? ???????? ?????????. ??????? DevTools ? Network ?? ???? /recipes POST ???????.\n?????? ??????? ?????? ???? ??????. ????? Thumbnail ????? URL ?? ?????? ?????.");
      }
    });
  }

  cancel() { this.router.navigate(["/"]); }
}
