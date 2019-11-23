import { Component, Input } from '@angular/core';
import * as moment from 'moment';

import { Weather, WeatherList } from '../../../model/weather';
import { PartsOfDay } from '../../../utils';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent {
  @Input() cityWeathers: Weather[];
  @Input() shouldShowSpinner: boolean;

  partsOfDay = PartsOfDay;

  getTemparatureFromWeatherList(weathersList: WeatherList[], partsOfDay: PartsOfDay) {
    return weathersList.filter(weatherList => moment(weatherList.dt_txt).format('HH:mm') === partsOfDay)[0].main.temp;
  }

}


