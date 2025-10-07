export interface Recipe {
  id?: number;
  title: string;
  description: string;
  thumbnail: string;
  ingredients: string[];
  instructions: string;
  favorite?: boolean;
}
