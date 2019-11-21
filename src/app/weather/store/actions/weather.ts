import { Action } from '@ngrx/store';
import { Weather } from '../../../model/weather';


export enum WeatherActionTypes {
    SET_CITY_STARTED = '[Weather Component] Set City Started',
    SET_CITY_SUCCESS = '[Weather Component] Set City Success',
    SET_CITY_FAILED = '[Weather Component] Set City Failed',
}

export class SetCityStarted implements Action {
    readonly type = WeatherActionTypes.SET_CITY_STARTED;

    constructor(public payload: string) { }
}

export class SetCitySuccess implements Action {
    readonly type = WeatherActionTypes.SET_CITY_SUCCESS;

    constructor(public payload: Weather) { }
}

export class SetCityFailed implements Action {
    readonly type = WeatherActionTypes.SET_CITY_FAILED;

    constructor(public payload: string) { }
}