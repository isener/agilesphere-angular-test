import { WeatherActionTypes } from '../actions/weather';
import { Weather } from '../../../model/weather';

export interface WeatherState {
    cityWeathers: Weather[];
    shouldShowSpinner: boolean;
}

export function weatherReducer(state: WeatherState = { cityWeathers: [], shouldShowSpinner: false }, action) {
    switch (action.type) {
        case WeatherActionTypes.SET_CITY_FETCHING: {
            return { ...state, shouldShowSpinner: true };
        }

        case WeatherActionTypes.SET_CITY: {
            return { ...state, cityWeathers: state.cityWeathers.concat(action.payload) };
        }

        case WeatherActionTypes.SET_CITY_FINISHED: {
            return { ...state, shouldShowSpinner: false };
        }

        default: {
            return state;
        }
    }
}