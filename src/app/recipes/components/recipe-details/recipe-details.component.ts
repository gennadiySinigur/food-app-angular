import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  Observable,
  switchMap,
} from 'rxjs';

import { Ingredient } from '../../models/ingredient';
import { RecipesService } from '../../services/recipes.service';
import { RecipeDetailsInfo } from '../../models/recipe-details-info';
import { TransformResponseDataService } from '../../services/transform-response-data.service';
import { MyRecipesService } from '../../services/my-recipes.service';
import { MyRecipeWithId } from '../../models/my-recipe-with-id';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  recipeInfo!: RecipeDetailsInfo;
  myRecipeInfo!: MyRecipeWithId;
  currentPath: string = '';
  isMyRecipe = false;

  recipeIngredients: Array<Ingredient> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService,
    private transformResponseDataService: TransformResponseDataService,
    private myRecipesService: MyRecipesService
  ) { }

  ngOnInit(): void {
    this.getCurrentPath();

    if (this.currentPath.includes('my-recipes')) {
      this.getMyRecipeInfo();

      return;
    }

    this.getRecipeInfo();
  }

  getCurrentPath() {
    this.activatedRoute.url.subscribe(url => {
      this.currentPath = url.join('/');
    });
  }

  getRecipeInfo(): void {
    this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap): Observable<RecipeDetailsInfo> => {
        return this.recipesService.getDetailsById(params.get('id')!);
      }),
    ).subscribe((recipeData: RecipeDetailsInfo): void => {
        this.transformResponseDataService.extractIngredientsIntoArray(recipeData);

        this.recipeIngredients = this.transformResponseDataService.ingredients;
        this.recipeInfo = recipeData;
      }
    );

    this.isMyRecipe = false;
  }

  getMyRecipeInfo(): void {
    this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap): Observable<MyRecipeWithId> => {
        return this.myRecipesService.getById(params.get('id')!);
      })
    ).subscribe((recipeData: MyRecipeWithId) => {
      this.myRecipeInfo = recipeData;
    });

    this.isMyRecipe = true;
  }
}
