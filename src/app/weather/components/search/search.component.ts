import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import { SetCityStarted } from '../../store/actions/weather';
import { takeUntil } from 'rxjs/operators';
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
  error$: Observable<string>;

  constructor(private store: Store<WeatherState>) {
    super();

    this.shouldShowSpinner$ = this.store.pipe(takeUntil(this.componentDestroyed$), select('weather'), select('shouldShowSpinner'));
    this.error$ = this.store.pipe(takeUntil(this.componentDestroyed$), select('weather'), select('error'));
  }

  search() {
    if (!this.searchForm.valid) {
      return;
    }

    this.store.dispatch(new SetCityStarted(this.searchForm.value));
  }
}
