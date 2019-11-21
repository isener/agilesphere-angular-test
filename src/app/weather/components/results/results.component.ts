import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as moment from 'moment';

import { Weather, WeatherList } from '../../../model/weather';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent, PartsOfDay } from '../../../utils';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent extends BaseComponent {
  cityWeathers$: Observable<Weather[]>;
  shouldShowSpinner$: Observable<boolean>;
  partsOfDay = PartsOfDay;

  constructor(private store: Store<any>) {
    super();

    this.cityWeathers$ = this.store.pipe(takeUntil(this.componentDestroyed$), select('weather'), select('cityWeathers'));
    this.shouldShowSpinner$ = this.store.pipe(takeUntil(this.componentDestroyed$), select('weather'), select('shouldShowSpinner'));
  }

  getTemparatureFromWeatherList(weathersList: WeatherList[], partsOfDay: PartsOfDay) {
    return weathersList.filter(weatherList => moment(weatherList.dt_txt).format('HH:mm') === partsOfDay)[0].main.temp;
  }

}


