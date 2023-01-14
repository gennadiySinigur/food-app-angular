import { Ingredient } from './ingredient';

export interface MyRecipe {
  title: string,
  category: string,
  imageAddress: string,
  instruction: string,
  ingredients: Array<Ingredient>
}
