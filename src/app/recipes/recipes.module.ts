import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { RouterLinkWithHref } from '@angular/router';
import { RecipeCategoriesComponent } from './components/recipe-categories/recipe-categories.component';
import { MyRecipesComponent } from './components/my-recipes/my-recipes.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipeCardComponent,
    RecipeDetailsComponent,
    RecipeCategoriesComponent,
    MyRecipesComponent
  ],
  imports: [
    CommonModule,
    RouterLinkWithHref,
  ],
  exports: [
    RecipesComponent,
    RecipesListComponent,
    RecipeCardComponent,
    RouterLinkWithHref
  ]
})
export class RecipesModule { }
