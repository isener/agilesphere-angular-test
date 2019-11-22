import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';

import { WeatherEffects } from './weather';
import { WeatherService } from '../../weather.service';
import { SetCitySuccess, SetCityStarted } from '../actions/weather';
import { Weather } from '../../../model/weather';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

describe('PostsEffects', () => {
    let effects;
    let weatherService;
    let actions: Observable<any>;


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

        spyOn(weatherService, 'searchWeatherForCity').and.returnValue(of({ id: 1 }));
    });

    describe('get$', () => {

        it('should return a GET_POSTS_SUCCESS action, on success', () => {
            const mockResponse = { id: 1 } as Weather;

            const action = new SetCityStarted('London');
            const completion = new SetCitySuccess(mockResponse);

            actions = hot('--a-', { a: action });
            const expected = cold('--b', { b: completion });

            expect(effects.weatherCitySet$).toBeObservable(expected);

        });


        // it('should return a GET_POSTS_FAIL action, on error, after the de-bounce', fakeAsync(function () {
        //     // const expectedResult = getPostsFail('error');
        //     // let resultFromEffect = null;

        //     // postsService.get.and.returnValue(Observable.throw('error'));
        //     // runner.queue(getPosts());

        //     // postsEffects.posts$.subscribe(result => result = resultFromEffect);
        //     // tick(399);
        //     // expect(result).toEqual(null);
        //     // tick(400);
        //     // expect(result).toEqual(expectedResult);

        // }));

    });

});