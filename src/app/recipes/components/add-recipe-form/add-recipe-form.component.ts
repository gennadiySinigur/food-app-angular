import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { MyRecipesService } from '../../services/my-recipes.service';

@Component({
  selector: 'app-add-recipe-form',
  templateUrl: './add-recipe-form.component.html',
  styleUrls: ['./add-recipe-form.component.scss']
})
export class AddRecipeFormComponent implements OnInit, AfterViewInit {
  addRecipeForm!: FormGroup;
  ingredients: FormArray = new FormArray<FormControl>([new FormControl()]);

  @Output()
  onCancel: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  recipeAdded: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('formControlButton', { static: false }) formControlButton!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private myRecipesService: MyRecipesService,
    private router: Router,
    private renderer: Renderer2,
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

  ngAfterViewInit() {
    this.addClassForButtonInChrome();
  }

  private addClassForButtonInChrome() {
    const userAgent = window.navigator.userAgent;
    const isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor);

    if (isChrome) {
      this.renderer.addClass(this.formControlButton.nativeElement, 'chrome-button');
    }
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
