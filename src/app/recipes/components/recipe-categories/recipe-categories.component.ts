import { Component, OnInit } from '@angular/core';

import { RecipesService } from '../../services/recipes.service';
import { RecipeCategory } from '../../models/recipe-category';

@Component({
  selector: 'app-recipe-categories',
  templateUrl: './recipe-categories.component.html',
  styleUrls: ['./recipe-categories.component.scss']
})
export class RecipeCategoriesComponent implements OnInit {
  recipeCategories: Array<RecipeCategory> = [];

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.recipesService.getRecipeCategories().subscribe((data) => {
      this.recipeCategories = data.categories;
    });
  }
}
