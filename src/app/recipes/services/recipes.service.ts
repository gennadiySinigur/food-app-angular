import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Meals } from '../models/meals';
import { MealDetails } from '../models/meal-details';
import { RecipeCategories } from '../models/recipe-categories';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient) { }

  getAll(id: string): Observable<Meals> {
    return this.http.get<Meals>(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`
    );
  }

  getRecipeDetails(id: string): Observable<MealDetails> {
    return this.http.get<MealDetails>(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    )
  }

  getRecipeCategories(): Observable<RecipeCategories> {
    return this.http.get<RecipeCategories>(
      'https://www.themealdb.com/api/json/v1/1/categories.php'
    )
  }
}
