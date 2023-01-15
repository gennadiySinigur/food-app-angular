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

  save(recipe: MyRecipe): void {
    this.http.post<MyRecipe>('http://localhost:8080/api/my-recipes/add', recipe)
      .subscribe();
  }

  getAll(): Observable<Array<MyRecipeWithId>> {
    return this.http.get<Array<MyRecipeWithId>>('http://localhost:8080/api/my-recipes');
  }

  getById(id: string | null): Observable<MyRecipeWithId> {
    return this.http.get<MyRecipeWithId>(`http://localhost:8080/api/my-recipes/${id}`);
  }

  updateById(id: string | null, updatedRecipe: MyRecipeWithId): void {
    this.http.put<MyRecipeWithId>(
      `http://localhost:8080/api/my-recipes/${id}/update`,
      updatedRecipe
    ).subscribe();
  }
}
