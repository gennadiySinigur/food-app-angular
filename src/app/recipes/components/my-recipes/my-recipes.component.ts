import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MyRecipesService } from '../../services/my-recipes.service';
import { MyRecipeWithId } from '../../models/my-recipe-with-id';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.scss']
})
export class MyRecipesComponent implements OnInit {
  isFormDisplayed = false;
  recipes$: Observable<Array<MyRecipeWithId>> = new Observable<Array<MyRecipeWithId>>();

  constructor(private myRecipesService: MyRecipesService) { }

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipes$ = this.myRecipesService.getAll();
  }

  toggleForm(): void {
    this.isFormDisplayed = !this.isFormDisplayed;
  }
}
