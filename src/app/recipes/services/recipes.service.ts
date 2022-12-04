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
  private cachedRecipesByCategoryId$: Map<string, Observable<Meals>> = new Map<string, Observable<Meals>>;
  private cachedRecipeDetailsById$: Map<string, Observable<RecipeDetailsInfo>> = new Map<string, Observable<RecipeDetailsInfo>>;

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) {
    this.handleError = this.handleError.bind(this);
  }

  getAllById(id: string): Observable<Meals> {
    if (!this.cachedRecipesByCategoryId$.get(id)) {
      let recipesByCategoryId$ = this.http.get<Meals>(
        `${RECIPES_BASE_URL}/filter.php?c=${id}`
      ).pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
        catchError(this.handleError)
      );

      this.cachedRecipesByCategoryId$.set(id, recipesByCategoryId$);
    }

    return this.cachedRecipesByCategoryId$.get(id)!;
  }

  getDetailsById(id: string): Observable<RecipeDetailsInfo> {
    if (!this.cachedRecipeDetailsById$.get(id)) {
      let recipeDetailsById$ = this.http.get<MealDetails>(
        `${RECIPES_BASE_URL}/lookup.php?i=${id}`
      ).pipe(
        map((recipe) => recipe.meals[0]),
        shareReplay({ bufferSize: 1, refCount: true }),
        catchError(this.handleError)
      );

      this.cachedRecipeDetailsById$.set(id, recipeDetailsById$);
    }

    return this.cachedRecipeDetailsById$.get(id)!;
  }

  getCategories(): Observable<Array<RecipeCategory>> {
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

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.toastService.show(error.message);

    return throwError(() => {
      return error;
    });
  }
}
