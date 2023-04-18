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
import { EditRecipeFormComponent } from './recipes/components/edit-recipe-form/edit-recipe-form.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'categories', component: RecipeCategoriesComponent },
  { path: 'categories/:id', component: RecipesComponent },
  { path: 'categories/recipes/:id', component: RecipeDetailsComponent },
  {
    path: 'my-recipes',
    component: MyRecipesComponent,
    canActivate: [AuthGuard],
  },
  { path: 'my-recipes/:id', component: RecipeDetailsComponent },
  { path: 'my-recipes/:id/update', component: EditRecipeFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
