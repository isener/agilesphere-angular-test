import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { _if } from 'rxjs/observable/if';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';

import { Weather } from '../model/weather';
import { BaseComponent } from '../utils';

@Injectable()
export class WeatherService extends BaseComponent {
  private url = 'https://api.openweathermap.org/data/2.5/forecast';
  private APPID = '010721642521f31b0fbc8c3831d45951';
  private httpOptions = { observe: 'response' } as any;

  constructor(private http: HttpClient) { super(); }

  searchWeatherForCity(city: string) {
    const params = {
      q: city,
      cnt: '8',
      units: 'metric',
      APPID: this.APPID
    };

    return this.http.get(this.url, { params, ...this.httpOptions })
      .pipe(
        takeUntil(this.componentDestroyed$),
        switchMap((weatherResponse: any) =>
          _if(
            () => weatherResponse.status === 200,
            of(weatherResponse.body as Weather),
            _throw('Something went wrong, please try again later')
          )),
        catchError(error =>
          _if(
            () => error.status === 404,
            _throw('City not found'),
            _throw('Something went wrong, please try again later')))
      );
  }

}
