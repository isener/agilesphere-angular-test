import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import { WeatherService } from '../../weather.service';
import { Weather } from '../../../model/weather';
import { SetCity, SetCityFetching, SetCityFinished } from '../../store/actions/weather';
import { finalize, takeUntil } from 'rxjs/operators';
import { WeatherState } from '../../store/reducers/weather';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../utils';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent extends BaseComponent {
  searchForm = new FormControl('', Validators.required);
  shouldShowSpinner$: Observable<boolean>;

  constructor(private weatherService: WeatherService, private store: Store<WeatherState>) {
    super();

    this.shouldShowSpinner$ = this.store.pipe(takeUntil(this.componentDestroyed$), select('weather'), select('shouldShowSpinner'));
  }

  search() {
    if (!this.searchForm.valid) {
      return;
    }

    this.store.dispatch(new SetCityFetching());

    this.weatherService.searchWeatherForCity(this.searchForm.value)
      .pipe(
        finalize(() => this.store.dispatch(new SetCityFinished()))
      )
      .subscribe(
        (res: Weather) => {
          this.store.dispatch(new SetCity(res));
          this.searchForm.setValue('');
        }
        , err => { }); // TODO: handle error
  }
}
