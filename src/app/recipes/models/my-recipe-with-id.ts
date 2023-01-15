import { MyRecipe } from './my-recipe';

export interface MyRecipeWithId extends MyRecipe {
  id: string,
}
