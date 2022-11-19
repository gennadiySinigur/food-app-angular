import { Ingredient } from './ingredient';

export interface RecipeDetails {
  idMeal: string;
  strMeal: string;
  strCategory: string,
  strMealThumb: string;
  ingredients: Array<Ingredient>;
  strInstructions: string;
  strYoutube: string;
  strSource: string;
}
