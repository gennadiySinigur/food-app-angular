import { Injectable } from '@angular/core';
import {
  from,
  map,
  of,
  skip,
  take,
  zip
} from 'rxjs';

import { Ingredient } from '../models/ingredient';
import { RecipeDetailsInfo } from '../models/recipe-details-info';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  ingredients: Array<Ingredient> = [];

  extract(mealsData: RecipeDetailsInfo) {
    const mealIngredients: Array<Ingredient> = [];

    of(Object.entries(mealsData)).pipe(
      map(data => {
        data.map(
          ([key, value]) => {
            if (key.includes('strMeasure')) {
              mealIngredients.push({ measure: value });
            }

            if (key.includes('strIngredient')) {
              mealIngredients.push({ name: value });
            }
          }
        );
      })
    ).subscribe();

    /** Without RxJs
     *
     * for (let [key, value] of Object.entries(mealsData)) {
     *    if (key.includes('strMeasure')) {
     *      mealIngredients.push({
     *        measure: value
     *      })
     *    }
     *
     *    if (key.includes('strIngredient')) {
     *      mealIngredients.push({
     *        name: value,
     *      });
     *    }
     *  }
     */

    let ingredients: Array<Ingredient> = [];

    const names$ = from(mealIngredients)
      .pipe(
        take(20),
        map(value => value.name),
      );

    const measures$ = from(mealIngredients)
      .pipe(
        skip(20),
        map(value => value.measure),
      )

    zip(names$, measures$).pipe(
      map(([name, measure]) => ({ name, measure }))
    ).subscribe(value => ingredients.push(value));

    /** Without RxJs
     *
     *  let measureIndex = 20;
     *
     *  for (let i = 0; i < mealIngredients.length; i++) {
     *    ingredients.push({
     *      name: mealIngredients[i].name,
     *      measure: mealIngredients[measureIndex]?.measure,
     *    });
     *
     *  measureIndex++;
     }
     **/

    this.ingredients = ingredients;
  }
}
