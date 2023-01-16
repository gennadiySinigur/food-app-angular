import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { MyRecipesService } from '../../services/my-recipes.service';

@Component({
  selector: 'app-add-recipe-form',
  templateUrl: './add-recipe-form.component.html',
  styleUrls: ['./add-recipe-form.component.scss']
})
export class AddRecipeFormComponent implements OnInit {
  addRecipeForm!: FormGroup;
  ingredients: FormArray = new FormArray<FormControl>([new FormControl()]);

  @Output()
  onCancel: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  recipeAdded: EventEmitter<void> = new EventEmitter<void>();


  constructor(
    private formBuilder: FormBuilder,
    private myRecipesService: MyRecipesService,
    private router: Router
  ) {
    this.ingredients = this.formBuilder.array([
      this.formBuilder.group({
        name: [''],
        measure: ['']
      })
    ]);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.addRecipeForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required
      ]),
      category: new FormControl(null, [
        Validators.required
      ]),
      imageAddress: new FormControl(null, [
        Validators.required
      ]),
      ingredients: this.ingredients,
      instruction: new FormControl(null, [
        Validators.required
      ])
    });
  }

  addIngredient(): void {
    this.ingredients.push(this.formBuilder.group({
      name: [''],
      measure: ['']
    }));
  }

  submit() {
    if (this.addRecipeForm.invalid) {
      return;
    }

    this.myRecipesService.save(this.addRecipeForm.value)
      .subscribe(() => {
        this.recipeAdded.emit();
      });

    this.router.navigate([`my-recipes`]);
  }

  cancel(): void {
    this.onCancel.emit();
  }
}
