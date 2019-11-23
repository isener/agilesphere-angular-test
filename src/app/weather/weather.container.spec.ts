import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { reducers, effects } from './store';
import { WeatherContainer } from './weather.container';
import { WeatherService } from './weather.service';

describe('WeatherContainer', () => {
  let component: WeatherContainer;
  let fixture: ComponentFixture<WeatherContainer>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherContainer],
      providers: [WeatherService],
      imports: [
        HttpClientModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('weather', reducers),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([effects])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should give an error with a wrong city name', done => {
    component.onSearch('Londland');

    component.error$.subscribe(errorText => {
      if (errorText) {
        expect(errorText.length > 0).toBeTruthy();
        done();
      }
    });
  });

  it('should populate cities when a new city is added', done => {
    component.onSearch('London');

    component.cityWeathers$.subscribe(cityWeathers => {
      if (cityWeathers.length > 0) {
        expect(cityWeathers.length > 0).toBeTruthy();
        done();
      }
    });
  });
});
