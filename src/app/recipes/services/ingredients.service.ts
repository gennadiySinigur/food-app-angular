import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient';
import { RecipeDetailsInfo } from '../models/recipe-details-info';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  ingredients: Array<Ingredient> = [];

  extract(mealsData: RecipeDetailsInfo) {
    const mealIngredients: Array<Ingredient> = [];

    for (let [key, value] of Object.entries(mealsData)) {
      if (key.includes('strMeasure')) {
        mealIngredients.push({
          measure: value
        })
      }

      if (key.includes('strIngredient')) {
        mealIngredients.push({
          name: value,
        });
      }
    }

    let ingredients = [];
    let measureIndex = 20;

    for (let i = 0; i < mealIngredients.length; i++) {
      ingredients.push({
        name: mealIngredients[i].name,
        measure: mealIngredients[measureIndex]?.measure,
      });

      measureIndex++;
    }

    this.ingredients = ingredients;
  }
}
