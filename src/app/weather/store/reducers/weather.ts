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
            return { ...state, cityWeathers: state.cityWeathers.concat(action.payload), shouldShowSpinner: false };
        }

        case WeatherActionTypes.SET_CITY_FAILED: {
            return { ...state, error: action.payload, shouldShowSpinner: false };
        }

        default: {
            return state;
        }
    }
}