import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../models/ingredient';
import { ActivatedRoute, Router } from '@angular/router';
import {
  map,
  Observable,
  switchMap,
} from 'rxjs';

import { RecipesService } from '../../services/recipes.service';
import { RecipeDetailsInfo } from '../../models/recipe-details-info';
import { MealDetails } from '../../models/meal-details';
import {IngredientsService} from '../../services/ingredients.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  recipeInfo: RecipeDetailsInfo = {
    idMeal: '',
    strMeal: '',
    strDrinkAlternate: '',
    strCategory: '',
    strArea: '',
    strInstructions: '',
    strMealThumb: '',
    strTags: '',
    strYoutube: '',
    strIngredient1: '',
    strIngredient2: '',
    strIngredient3: '',
    strIngredient4: '',
    strIngredient5: '',
    strIngredient6: '',
    strIngredient7: '',
    strIngredient8: '',
    strIngredient9: '',
    strIngredient10: '',
    strIngredient11: '',
    strIngredient12: '',
    strIngredient13: '',
    strIngredient14: '',
    strIngredient15: '',
    strIngredient16: '',
    strIngredient17: '',
    strIngredient18: '',
    strIngredient20: '',
    strMeasure1: '',
    strMeasure2: '',
    strMeasure3: '',
    strMeasure4: '',
    strMeasure5: '',
    strMeasure6: '',
    strMeasure7: '',
    strMeasure8: '',
    strMeasure9: '',
    strMeasure10: '',
    strMeasure11: '',
    strMeasure12: '',
    strMeasure13: '',
    strMeasure14: '',
    strMeasure15: '',
    strMeasure16: '',
    strMeasure17: '',
    strMeasure18: '',
    strMeasure19: '',
    strMeasure20: '',
    strSource: '',
    strImageSource: '',
    strCreativeCommonsConfirmed: '',
    dateModified: ''
  };

  recipeIngredients: Array<Ingredient> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService,
    private ingredientsService: IngredientsService
  ) { }

  ngOnInit(): void {
    this.getRecipeInfo();
  }

  getRecipeInfo() {
    this.route.paramMap.pipe(
      switchMap((params): Observable<MealDetails> => {
        return this.recipesService.getRecipeDetails(params.get('id')!);
      }),
      map((recipe) => recipe.meals[0])
    ).subscribe((info: RecipeDetailsInfo) => {
        this.ingredientsService.extract(info);

        this.recipeIngredients = this.ingredientsService.ingredients;
        this.recipeInfo = info;
      }
    );
  }
}
