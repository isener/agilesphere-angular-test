import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from '../../store';
import { WeatherService } from '../../weather.service';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [WeatherService],
      imports: [
        FormsModule,
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate form with empty input', () => {
    component.cityCtrl.setValue('');

    expect(component.cityCtrl.valid).toBeFalsy();
  });

  it('should fill the form with correct city name', () => {
    component.cityCtrl.setValue('London');

    expect(component.cityCtrl.value).toEqual('London');
  });

  it('should give an error with a wrong city name', done => {
    component.cityCtrl.setValue('Londland');
    component.search();

    component.error$.subscribe(errorText => {
      if (errorText) {
        expect(errorText.length > 0).toBeTruthy();
        done();
      }
    });
  });

});
