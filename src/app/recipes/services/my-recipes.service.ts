import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MyRecipe } from '../models/my-recipe';
import { MyRecipeWithId } from '../models/my-recipe-with-id';

@Injectable({
  providedIn: 'root'
})
export class MyRecipesService {

  constructor(private http: HttpClient) { }

  save(recipe: MyRecipe): Observable<MyRecipeWithId> {
    return this.http.post<MyRecipeWithId>('http://localhost:8080/api/my-recipes/add', recipe);
  }

  getAll(): Observable<Array<MyRecipeWithId>> {
    return this.http.get<Array<MyRecipeWithId>>('http://localhost:8080/api/my-recipes');
  }

  getById(id: string | null): Observable<MyRecipeWithId> {
    return this.http.get<MyRecipeWithId>(`http://localhost:8080/api/my-recipes/${id}`);
  }

  updateById(id: string | null, updatedRecipe: MyRecipeWithId): Observable<MyRecipeWithId> {
    return this.http.put<MyRecipeWithId>(
      `http://localhost:8080/api/my-recipes/${id}/update`,
      updatedRecipe
    );
  }
}
