import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RegistrationComponent } from './core/registration/registration.component';
import { LoginComponent } from './core/login/login.component';
import { RecipeDetailsComponent } from './recipes/components/recipe-details/recipe-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recipes/:id', component: RecipeDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
