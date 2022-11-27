import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { Meals } from '../models/meals';
import { MealDetails } from '../models/meal-details';
import { RecipeCategories } from '../models/recipe-categories';
import { ToastService } from '../../shared/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) {
    this.handleError = this.handleError.bind(this);
  }

  getAll(id: string): Observable<Meals> {
    return this.http.get<Meals>(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`
    ).pipe(
      catchError(this.handleError)
    );
  }

  getRecipeDetails(id: string): Observable<MealDetails> {
    return this.http.get<MealDetails>(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    ).pipe(
      catchError(this.handleError)
    );
  }

  getRecipeCategories(): Observable<RecipeCategories> {
    return this.http.get<RecipeCategories>(
      'https://www.themealdb.com/api/json/v1/1/categories.php'
    ).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    this.toastService.show(error.message);

    return throwError(() => {
      return error;
    });
  }
}
