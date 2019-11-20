import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { WeatherService } from '../../weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  searchForm = new FormControl('', Validators.required);

  constructor(private weatherService: WeatherService) { }

  search() {
    if (!this.searchForm.valid) {
      return;
    }

    this.weatherService.searchWeatherForCity(this.searchForm.value).subscribe(res => console.log(res));
  }
}
