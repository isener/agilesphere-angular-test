import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { WeatherActionTypes } from '../actions/weather';
import { WeatherService } from '../../weather.service';

@Injectable()
export class WeatherEffects {
    @Effect() weatherCitySet$: Observable<Action> = this.actions$.pipe(
        ofType(WeatherActionTypes.SET_CITY_STARTED),
        mergeMap((action: any) =>
            this.weatherService.searchWeatherForCity(action.payload).pipe(
                map(data => ({ type: WeatherActionTypes.SET_CITY_SUCCESS, payload: data })),
                catchError((error) => of({ type: WeatherActionTypes.SET_CITY_FAILED, payload: error }))
            )
        )
    );


    constructor(
        private weatherService: WeatherService,
        private actions$: Actions
    ) { }
}
