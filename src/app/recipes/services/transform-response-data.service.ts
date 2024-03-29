import { Injectable } from '@angular/core';
import {
  from,
  map,
  Observable,
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
export class TransformResponseDataService {
  ingredients: Array<Ingredient> = [];

  extractIngredientsIntoArray(mealsData: RecipeDetailsInfo): Array<Ingredient> {
    const mealIngredients: Array<Ingredient> = [];
    let finalIngredientsArray: Array<Ingredient> = [];

    this.extractNamesAndMeasures(mealsData, mealIngredients);
    this.buildFinalIngredientsArray(mealIngredients, finalIngredientsArray);

    this.ingredients = finalIngredientsArray;

    return finalIngredientsArray;
  }

  private extractNamesAndMeasures(
    mealsData: RecipeDetailsInfo,
    mealIngredients: Array<Ingredient>
  ): void {
    of(Object.entries(mealsData)).pipe(
      map((data) => {
        data.map(([key, value]) => {
          if (key.includes('strMeasure')) {
            mealIngredients.push({ measure: value });
          }

          if (key.includes('strIngredient')) {
            mealIngredients.push({ name: value });
          }
        });
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
  }

  private buildFinalIngredientsArray(
    mealIngredients: Array<Ingredient>,
    finalIngredientsArray: Array<Ingredient>
  ): void {
    const names$: Observable<string | undefined> = from(mealIngredients).pipe(
      take(20),
      map(value => value.name),
    );

    const measures$: Observable<string | undefined>  = from(mealIngredients).pipe(
      skip(20),
      map(value => value.measure),
    );

    zip(names$, measures$).pipe(
      map(([name, measure]) => ({ name, measure }))
    ).subscribe(value => finalIngredientsArray.push(value));

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
  }
}
