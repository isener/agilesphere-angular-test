import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '../utils';
import { WeatherState } from './store/reducers/weather';
import { SetCityStarted } from './store/actions/weather';
import { Weather } from '../model/weather';

@Component({
  selector: 'app-weather',
  template: `
  <app-search (search)="onSearch($event)" [error]="error$ | async"></app-search>

  <app-results [cityWeathers]="cityWeathers$ | async" [shouldShowSpinner]="shouldShowSpinner$ | async"></app-results>
  `
})
export class WeatherContainer extends BaseComponent {
  error$: Observable<string>;
  cityWeathers$: Observable<Weather[]>;
  shouldShowSpinner$: Observable<boolean>;

  constructor(private store: Store<WeatherState>) {
    super();

    this.error$ = this.store.pipe(takeUntil(this.componentDestroyed$), select('weather'), select('error'));
    this.cityWeathers$ = this.store.pipe(takeUntil(this.componentDestroyed$), select('weather'), select('cityWeathers'));
    this.shouldShowSpinner$ = this.store.pipe(takeUntil(this.componentDestroyed$), select('weather'), select('shouldShowSpinner'));
  }

  onSearch(cityName: string) {
    this.store.dispatch(new SetCityStarted(cityName));
  }

}
