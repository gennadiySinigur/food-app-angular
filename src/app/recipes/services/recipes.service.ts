import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, shareReplay, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Meals } from '../models/meals';
import { MealDetails } from '../models/meal-details';
import { RecipeCategories } from '../models/recipe-categories';
import { ToastService } from '../../shared/services/toast.service';
import { RecipeCategory } from '../models/recipe-category';
import { RecipeDetailsInfo } from '../models/recipe-details-info';

const { RECIPES_BASE_URL } = environment;

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private cachedCategories$: Observable<Array<RecipeCategory>> | undefined;

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

  getRecipeDetails(id: string): Observable<RecipeDetailsInfo> {
    return this.http.get<MealDetails>(
      `${RECIPES_BASE_URL}/lookup.php?i=${id}`
    ).pipe(
      map((recipe) => recipe.meals[0]),
      catchError(this.handleError)
    );
  }

  getRecipeCategories(): Observable<Array<RecipeCategory>> {
    if (!this.cachedCategories$) {
      this.cachedCategories$ = this.http.get<RecipeCategories>(
        `${RECIPES_BASE_URL}/categories.php`
      ).pipe(
        map(data => data.categories),
        shareReplay({ bufferSize: 1, refCount: true }),
        catchError(this.handleError),
      );
    }

    return this.cachedCategories$;
  }

  private handleError(error: HttpErrorResponse) {
    this.toastService.show(error.message);

    return throwError(() => {
      return error;
    });
  }
}
