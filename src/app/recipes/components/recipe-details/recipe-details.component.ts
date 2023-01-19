import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  map,
  Observable, Subscription,
  switchMap,
} from 'rxjs';
import { ViewportScroller } from '@angular/common';
import { ElementRef, Renderer2 } from '@angular/core';

import { Ingredient } from '../../models/ingredient';
import { RecipesService } from '../../services/recipes.service';
import { RecipeDetailsInfo } from '../../models/recipe-details-info';
import { TransformResponseDataService } from '../../services/transform-response-data.service';
import { MyRecipesService } from '../../services/my-recipes.service';
import { MyRecipeWithId } from '../../models/my-recipe-with-id';
import { ToastService } from '../../../shared/services/toast.service';
import { ConfirmationService } from '../../../shared/services/confirmation.service';
import { BlockUIService } from '../../../shared/services/block-ui.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  recipeInfo$: Observable<RecipeDetailsInfo> | undefined;
  recipeIngredients$: Observable<Array<Ingredient>> = new Observable<Array<Ingredient>>();
  myRecipeInfo$: Observable<MyRecipeWithId> | undefined;

  currentPath: string = '';
  id!: string | null;

  private blockUISubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService,
    private transformResponseDataService: TransformResponseDataService,
    private myRecipesService: MyRecipesService,
    private toastService: ToastService,
    private viewportScroller: ViewportScroller,
    private confirmationService: ConfirmationService,
    protected blockUIService: BlockUIService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.getCurrentPath();
    this.getRecipeId();

    this.getRecipeInfo();
    this.getMyRecipeInfo();

    this.toggleClassForBlockingUI();
  }

  toggleClassForBlockingUI(): void {
    this.blockUISubscription = this.blockUIService.isBlocked$.subscribe((isBlocked) => {
      if (isBlocked) {
        this.renderer.addClass(this.elementRef.nativeElement, 'blocked');
      } else {
        this.renderer.removeClass(this.elementRef.nativeElement, 'blocked');
      }
    });
  }

  getCurrentPath(): void {
    this.currentPath = this.activatedRoute.snapshot.url.join('/');
  }

  getRecipeId(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  getRecipeInfo(): void {
    this.recipeInfo$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap): Observable<RecipeDetailsInfo> => {
        return this.recipesService.getDetailsById(params.get('id')!);
      }),
    );

    this.recipeIngredients$ = this.recipeInfo$.pipe(
      map((recipeData: RecipeDetailsInfo) => {
        return this.transformResponseDataService.extractIngredientsIntoArray(recipeData);
      }),
    );
  }

  getMyRecipeInfo(): void {
    this.myRecipeInfo$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap): Observable<MyRecipeWithId> => {
        return this.myRecipesService.getById(params.get('id')!);
      }),
    );
  }

  editRecipe(): void {
    this.router.navigate([`my-recipes/${this.id}/update`]);
  }

  deleteRecipe() {
    this.blockUIService.setBlockUI(true);
    this.renderer.addClass(this.elementRef.nativeElement, 'blocked');

    this.toastService.show(
      "confirmation",
      "Are you sure you want to delete this recipe?",
    );

    this.viewportScroller.scrollToPosition([0, 0]);

    this.confirmationService.confirm().subscribe(result => {
      if (result) {
        this.toastService.hide();

        this.myRecipesService.deleteById(this.id).subscribe();

        this.router.navigate([`my-recipes`]);
      } else {
        this.toastService.hide();
      }

      this.blockUIService.setBlockUI(false);
      this.renderer.removeClass(this.elementRef.nativeElement, 'blocked');
    });
  }

  ngOnDestroy() {
    this.blockUISubscription.unsubscribe();
  }
}
