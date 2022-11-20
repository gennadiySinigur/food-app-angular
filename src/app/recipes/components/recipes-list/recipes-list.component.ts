import { Component, OnInit } from '@angular/core';

import { Recipe } from '../../models/recipe';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  recipes: Array<Recipe> = [];

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes() {
    this.recipesService.getAll()
      .subscribe((data) => {
        const { meals } = data;
        this.recipes = meals;
      });
  }

}
