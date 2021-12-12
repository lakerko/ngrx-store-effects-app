import { Pizza } from 'src/products/models/pizza.model';
import * as fromPizza from '../actions/pizzas.action';

export interface PizzaState {
  data: Pizza[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  data: [],
  loaded: false,
  loading: false,
};

export function reducer(state = initialState, action: fromPizza.PizzasAction): PizzaState {

  switch(action.type) {

    case fromPizza.LOAD_PIZZAS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromPizza.LOAD_PIZZAS_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        data,
      };
    }

    case fromPizza.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
  }

  return state;
}

export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzas = (state: PizzaState) => state.data;