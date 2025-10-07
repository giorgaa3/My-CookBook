import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

export interface Recipe {
  id?: number;
  title: string;
  description: string;
  thumbnail: string;
  ingredients: string[];
  instructions: string;
  favorite?: boolean;
}

const STORAGE_KEY = "recipes";

@Injectable({ providedIn: "root" })
export class RecipeService {
  private read(): Recipe[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as Recipe[] : [];
  }
  private write(data: Recipe[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
  private seedOnce() {
    const data = this.read();
    if (data.length === 0) {
      this.write([{
        id: 1,
        title: "Margherita Pizza",
        description: "Classic Neapolitan with fresh basil.",
        thumbnail: "assets/seed/pizza.jpg",
        ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella", "Basil", "Olive oil"],
        instructions: "1) Preheat oven to 250°C...\n2) Spread sauce...\n3) Bake 7–9 min...",
        favorite: false
      }]);
    }
  }

  constructor() { this.seedOnce(); }

  list(q?: string): Observable<Recipe[]> {
    let data = this.read();
    if (q && q.trim()) {
      const s = q.toLowerCase();
      data = data.filter(r =>
        r.title.toLowerCase().includes(s) ||
        r.description.toLowerCase().includes(s) ||
        (r.ingredients?.join(" ").toLowerCase().includes(s))
      );
    }
    return of(data).pipe(delay(100));
  }

  get(id: number): Observable<Recipe> {
    const r = this.read().find(x => x.id === id)!;
    return of(r).pipe(delay(50));
  }

  create(payload: Recipe): Observable<Recipe> {
    const data = this.read();
    const nextId = (data.reduce((m, r) => Math.max(m, r.id ?? 0), 0) + 1) || 1;
    const item: Recipe = { ...payload, id: nextId, favorite: !!payload.favorite };
    data.push(item);
    this.write(data);
    return of(item).pipe(delay(100));
  }

  update(id: number, payload: Recipe): Observable<Recipe> {
    const data = this.read();
    const idx = data.findIndex(r => r.id === id);
    if (idx >= 0) {
      data[idx] = { ...payload, id };
      this.write(data);
      return of(data[idx]).pipe(delay(100));
    }
    throw new Error("Recipe not found");
  }

  remove(id: number) {
    const data = this.read().filter(r => r.id !== id);
    this.write(data);
    return of(void 0).pipe(delay(50));
  }

  toggleFavorite(id: number, favorite: boolean) {
    const data = this.read();
    const idx = data.findIndex(r => r.id === id);
    if (idx >= 0) {
      data[idx].favorite = favorite;
      this.write(data);
      return of(data[idx]).pipe(delay(50));
    }
    throw new Error("Recipe not found");
  }
}
