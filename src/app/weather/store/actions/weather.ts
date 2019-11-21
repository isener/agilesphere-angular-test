import { Action } from '@ngrx/store';
import { Weather } from '../../../model/weather';


export enum WeatherActionTypes {
    SET_CITY = '[Weather Component] Set City Weather',
    SET_CITY_FETCHING = '[Weather Component] Set City Fetching',
    SET_CITY_FINISHED = '[Weather Component] Set City Finished',
}

export class SetCity implements Action {
    readonly type = WeatherActionTypes.SET_CITY;

    constructor(public payload: Weather) { }
}

export class SetCityFetching implements Action {
    readonly type = WeatherActionTypes.SET_CITY_FETCHING;
}

export class SetCityFinished implements Action {
    readonly type = WeatherActionTypes.SET_CITY_FINISHED;
}