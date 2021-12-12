import { Injectable } from "@angular/core";

import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import { Actions, Effect } from "@ngrx/effects";

import * as pizzaActions from '../actions/pizzas.action';
import { PizzasService } from '../../services/pizzas.service';

@Injectable()
export class PizzasEffects {

  constructor(
    private actions$: Actions,
    private pizzasService: PizzasService,
  ) {}

  @Effect()
  loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS)
    .pipe(
      switchMap(() => {
        return this.pizzasService.getPizzas()
          .pipe(
            map((pizzas) => new pizzaActions.LoadPizzasSuccess(pizzas)),
            catchError((error) => of(new pizzaActions.LoadPizzasFail(error)))
          )
      })
    );
}