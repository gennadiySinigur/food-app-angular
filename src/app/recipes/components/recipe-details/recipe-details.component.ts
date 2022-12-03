import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  switchMap,
} from 'rxjs';

import { Ingredient } from '../../models/ingredient';
import { RecipesService } from '../../services/recipes.service';
import { RecipeDetailsInfo } from '../../models/recipe-details-info';
import { TransformResponseDataService } from '../../services/transform-response-data.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  recipeInfo!: RecipeDetailsInfo;

  recipeIngredients: Array<Ingredient> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService,
    private transformResponseDataService: TransformResponseDataService
  ) { }

  ngOnInit(): void {
    this.getRecipeInfo();
  }

  getRecipeInfo() {
    this.activatedRoute.paramMap.pipe(
      switchMap((params): Observable<RecipeDetailsInfo> => {
        return this.recipesService.getRecipeDetails(params.get('id')!);
      }),
    ).subscribe((recipeData: RecipeDetailsInfo) => {
        this.transformResponseDataService.extractIngredientsIntoArray(recipeData);

        this.recipeIngredients = this.transformResponseDataService.ingredients;
        this.recipeInfo = recipeData;
      }
    );
  }
}
