import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs/observable/of';
import { _if } from 'rxjs/observable/if';
import { catchError, switchMap } from 'rxjs/operators';
import { Weather } from '../model/weather';

@Injectable()
export class WeatherService {
  private url = 'https://api.openweathermap.org/data/2.5/forecast';
  private httpOptions = { observe: 'response' } as any;

  constructor(private http: HttpClient) { }

  searchWeatherForCity(city: string) {
    const params = {
      q: city,
      cnt: '8',
      units: 'metric',
      APPID: '010721642521f31b0fbc8c3831d45951'
    };

    return this.http.get(this.url, { params, ...this.httpOptions })
      .pipe(
        switchMap((weatherResponse: any) => _if(
          () => weatherResponse.status === 200,
          of(weatherResponse.body as Weather),
          of({ hede: 'hodo' }))),
        catchError(error => of({ ...error.error }))
      );
  }

}
