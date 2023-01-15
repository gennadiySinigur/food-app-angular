import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MyRecipesService } from '../../services/my-recipes.service';

@Component({
  selector: 'app-edit-recipe-form',
  templateUrl: './edit-recipe-form.component.html',
  styleUrls: ['./edit-recipe-form.component.scss']
})
export class EditRecipeFormComponent implements OnInit {
  editRecipeForm!: FormGroup;
  id!: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private myRecipesService: MyRecipesService,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.myRecipesService.getById(this.id).subscribe((recipe) => {
      this.editRecipeForm = new FormGroup({
        title: new FormControl(recipe.title, [
          Validators.required
        ]),
        category: new FormControl(recipe.category, [
          Validators.required
        ]),
        imageAddress: new FormControl(recipe.imageAddress, [
          Validators.required
        ]),
        ingredients: this.formBuilder.array(recipe.ingredients.map((ingredient) => {
          return this.formBuilder.group({
            name: [ingredient.name],
            measure: [ingredient.measure]
          })
        })),
        instruction: new FormControl(recipe.instruction, [
          Validators.required
        ])
      });
    });
  }

  addIngredient(): void {
    (this.editRecipeForm.get('ingredients') as FormArray)
      .push(this.formBuilder.group({
        name: [''],
        measure: ['']
      }
    ));
  }

  submit() {
    if (this.editRecipeForm.invalid) {
      return;
    }

    console.log('form', this.editRecipeForm.value);

    this.myRecipesService.updateById(this.id, this.editRecipeForm.value);
  }

  cancel(): void {
    console.log('cancel');
  }

}
