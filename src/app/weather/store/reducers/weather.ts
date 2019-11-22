import { WeatherActionTypes } from '../actions/weather';
import { Weather } from '../../../model/weather';

export interface WeatherState {
    cityWeathers: Weather[];
    shouldShowSpinner: boolean;
    error: string;
}

export function weatherReducer(initialState: WeatherState = { cityWeathers: [], shouldShowSpinner: false, error: '' }, action) {
    switch (action.type) {
        case WeatherActionTypes.SET_CITY_STARTED: {
            return { ...initialState, shouldShowSpinner: true, error: '' };
        }

        case WeatherActionTypes.SET_CITY_SUCCESS: {
            return { ...initialState, shouldShowSpinner: false, cityWeathers: initialState.cityWeathers.concat(action.payload) };
        }

        case WeatherActionTypes.SET_CITY_FAILED: {
            return { ...initialState, shouldShowSpinner: false, error: action.payload };
        }

        default: {
            return initialState;
        }
    }
}