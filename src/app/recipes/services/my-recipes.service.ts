import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { MyRecipe } from '../models/my-recipe';
import { MyRecipeWithId } from '../models/my-recipe-with-id';

const { MY_RECIPES_BASE_URL } = environment;

@Injectable({
  providedIn: 'root'
})
export class MyRecipesService {

  constructor(private http: HttpClient) { }

  save(recipe: MyRecipe): Observable<MyRecipeWithId> {
    return this.http.post<MyRecipeWithId>(`${MY_RECIPES_BASE_URL}/my-recipes/add`, recipe);
  }

  getAll(): Observable<Array<MyRecipeWithId>> {
    return this.http.get<Array<MyRecipeWithId>>(`${MY_RECIPES_BASE_URL}/my-recipes`);
  }

  getById(id: string | null): Observable<MyRecipeWithId> {
    return this.http.get<MyRecipeWithId>(`${MY_RECIPES_BASE_URL}/my-recipes/${id}`);
  }

  updateById(id: string | null, updatedRecipe: MyRecipeWithId): Observable<MyRecipeWithId> {
    return this.http.put<MyRecipeWithId>(
      `${MY_RECIPES_BASE_URL}/my-recipes/${id}/update`,
      updatedRecipe
    );
  }

  deleteById(id: string | null): Observable<void> {
    return this.http.delete<void>(`${MY_RECIPES_BASE_URL}/my-recipes/${id}/delete`);
  }
}
