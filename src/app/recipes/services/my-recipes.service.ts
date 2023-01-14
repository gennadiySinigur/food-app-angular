import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MyRecipe } from '../models/my-recipe';

@Injectable({
  providedIn: 'root'
})
export class MyRecipesService {

  constructor(private http: HttpClient) { }

  save(recipe: MyRecipe): void {
    this.http.post<MyRecipe>('http://localhost:8080/api/my-recipes/add', recipe)
      .subscribe();
  }
}
