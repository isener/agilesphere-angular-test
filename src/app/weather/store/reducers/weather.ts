import { WeatherActionTypes } from '../actions/weather';
import { Weather } from '../../../model/weather';

export interface WeatherState {
    cityWeathers: Weather[];
    shouldShowSpinner: boolean;
    error: string;
}

export function weatherReducer(state: WeatherState = { cityWeathers: [], shouldShowSpinner: false, error: '' }, action) {
    switch (action.type) {
        case WeatherActionTypes.SET_CITY_STARTED: {
            return { ...state, shouldShowSpinner: true, error: '' };
        }

        case WeatherActionTypes.SET_CITY_SUCCESS: {
            return { ...state, shouldShowSpinner: false, cityWeathers: state.cityWeathers.concat(action.payload) };
        }

        case WeatherActionTypes.SET_CITY_FAILED: {
            return { ...state, shouldShowSpinner: false, error: action.payload };
        }

        default: {
            return state;
        }
    }
}