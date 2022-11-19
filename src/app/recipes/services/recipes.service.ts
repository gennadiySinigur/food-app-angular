import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Meals } from '../models/meals';
import { RecipeDetailsInfo } from '../models/recipe-details-info';
import {MealDetails} from '../models/meal-details';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Meals> {
    return this.http.get<Meals>(
      'https://www.themealdb.com/api/json/v1/1/filter.php?a=American'
    );
  }

  getRecipeDetails(id: string): Observable<MealDetails> {
    return this.http.get<MealDetails>(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    )
  }
}
