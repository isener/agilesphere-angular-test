import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';

import { WeatherEffects } from './weather';
import { WeatherService } from '../../weather.service';
import { SetCitySuccess, SetCityStarted, SetCityFailed } from '../actions/weather';
import { Weather } from '../../../model/weather';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

describe('PostsEffects', () => {
    let effects;
    let weatherService;
    let actions: Observable<any>;
    const mockSuccessData = { id: 1 };
    const mockErrorData = 'City not found';


    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
            WeatherEffects,
            WeatherService,
            provideMockActions(() => actions),
        ]
    }));

    beforeEach(() => {
        effects = TestBed.get(WeatherEffects);
        weatherService = TestBed.get(WeatherService);
    });

    describe('weatherCitySet$', () => {

        it('should return a SetCitySuccess action, on success', () => {
            spyOn(weatherService, 'searchWeatherForCity').and.returnValue(of(mockSuccessData));

            const action = new SetCityStarted('London');
            const completion = new SetCitySuccess(mockSuccessData as Weather);

            actions = hot('--a-', { a: action });
            const expected = cold('--b', { b: completion });

            expect(effects.weatherCitySet$).toBeObservable(expected);

        });


        it('should return a SetCityFailure action, on fail', () => {
            spyOn(weatherService, 'searchWeatherForCity').and.returnValue(_throw(mockErrorData));

            const action = new SetCityStarted('Londland');
            const completion = new SetCityFailed(mockErrorData);

            actions = hot('--a-', { a: action });
            const expected = cold('--b', { b: completion });

            expect(effects.weatherCitySet$).toBeObservable(expected);

        });

    });

});