import { Pizza } from 'src/products/models/pizza.model';
import * as fromPizza from '../actions/pizzas.action';

export interface PizzaState {
  entities: { [key: number]: Pizza };
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  entities: {},
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
      const pizzas = action.payload;
      const entities = pizzas.reduce((entities: { [key: number]: Pizza }, pizza: Pizza) => {
        return {
          ...entities,
          [pizza.id]: pizza,
        };
      }, {
        ...state.entities,
      });

      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
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
export const getPizzaEntities = (state: PizzaState) => state.entities;