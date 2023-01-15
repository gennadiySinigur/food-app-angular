import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RegistrationComponent } from './core/registration/registration.component';
import { LoginComponent } from './core/login/login.component';
import { RecipeDetailsComponent } from './recipes/components/recipe-details/recipe-details.component';
import { RecipeCategoriesComponent } from './recipes/components/recipe-categories/recipe-categories.component';
import { MyRecipesComponent } from './recipes/components/my-recipes/my-recipes.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'categories', component: RecipeCategoriesComponent },
  { path: 'categories/:id', component: RecipesComponent },
  { path: 'categories/recipes/:id', component: RecipeDetailsComponent },
  { path: 'my-recipes', component: MyRecipesComponent },
  { path: 'my-recipes/:id', component: RecipeDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
