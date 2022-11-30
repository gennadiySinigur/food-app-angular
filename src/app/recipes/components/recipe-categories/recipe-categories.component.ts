import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { RecipesService } from '../../services/recipes.service';
import { RecipeCategory } from '../../models/recipe-category';

@Component({
  selector: 'app-recipe-categories',
  templateUrl: './recipe-categories.component.html',
  styleUrls: ['./recipe-categories.component.scss']
})
export class RecipeCategoriesComponent implements OnInit {
  recipeCategories$: Observable<Array<RecipeCategory>> = new Observable<Array<RecipeCategory>>();

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.recipeCategories$ = this.recipesService.getRecipeCategories();
  }
}
