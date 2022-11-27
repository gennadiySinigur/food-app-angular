import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Meals } from '../models/meals';
import { MealDetails } from '../models/meal-details';
import { RecipeCategories } from '../models/recipe-categories';
import { ToastService } from '../../shared/services/toast.service';

const { RECIPES_BASE_URL } = environment;

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
      `${RECIPES_BASE_URL}/filter.php?c=${id}`
    ).pipe(
      catchError(this.handleError)
    );
  }

  getRecipeDetails(id: string): Observable<MealDetails> {
    return this.http.get<MealDetails>(
      `${RECIPES_BASE_URL}/lookup.php?i=${id}`
    ).pipe(
      catchError(this.handleError)
    );
  }

  getRecipeCategories(): Observable<RecipeCategories> {
    return this.http.get<RecipeCategories>(
      `${RECIPES_BASE_URL}/categories.php`
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
