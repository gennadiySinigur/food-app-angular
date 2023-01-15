import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  map,
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
  recipeInfo$: Observable<RecipeDetailsInfo> | undefined;
  recipeIngredients$: Observable<Array<Ingredient>> = new Observable<Array<Ingredient>>();
  myRecipeInfo$: Observable<MyRecipeWithId> | undefined;

  currentPath: string = '';
  id!: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService,
    private transformResponseDataService: TransformResponseDataService,
    private myRecipesService: MyRecipesService
  ) { }

  ngOnInit(): void {
    this.currentPath = this.activatedRoute.snapshot.url.join('/');
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.recipeInfo$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap): Observable<RecipeDetailsInfo> => {
        return this.recipesService.getDetailsById(params.get('id')!);
      }),
    );

    this.recipeIngredients$ = this.recipeInfo$.pipe(
      map((recipeData: RecipeDetailsInfo) => {
        return this.transformResponseDataService.extractIngredientsIntoArray(recipeData);
      }),
    );

    this.myRecipeInfo$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap): Observable<MyRecipeWithId> => {
        return this.myRecipesService.getById(params.get('id')!);
      }),
    );
  }

  editRecipe(): void {
    this.router.navigate([`my-recipes/${this.id}/update`]);
  }

}
