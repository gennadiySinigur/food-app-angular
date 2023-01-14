import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.scss']
})
export class MyRecipesComponent implements OnInit {
  isFormDisplayed = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleForm(): void {
    this.isFormDisplayed = !this.isFormDisplayed;
  }
}
