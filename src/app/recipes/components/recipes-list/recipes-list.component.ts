import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { Recipe } from '../../models/recipe';
import { RecipesService } from '../../services/recipes.service';
import { Meals } from '../../models/meals';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  recipes: Array<Recipe> = [];

  constructor(
    private recipesService: RecipesService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes() {
    this.activatedRoute.paramMap.pipe(
      switchMap((params): Observable<Meals> => {
        return this.recipesService.getAll(params.get('id')!);
      }),
    ).subscribe((data) => {
      this.recipes = data.meals;
    });
  }

}
