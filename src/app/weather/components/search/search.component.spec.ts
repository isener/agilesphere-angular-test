import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SearchComponent } from './search.component';

import Spy = jasmine.Spy;
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from '../../store';

import { WeatherService } from '../../weather.service';
import { skip } from 'rxjs/operators';
import { By } from '@angular/platform-browser';

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
    component.searchForm.setValue('');

    expect(component.searchForm.valid).toBeFalsy();
  });

  it('should fill the form with correct city name', () => {
    component.searchForm.setValue('London');

    expect(component.searchForm.value).toEqual('London');
  });

  it('should give an error with a wrong city name', () => {

    component.searchForm.setValue('London');
    component.search();
    fixture.detectChanges();

    component.error$.subscribe(res => console.log(res))

    let result = fixture.debugElement.query(By.css('.alert'));

    console.log(result)
    // expect(errorValue.length > 0).toBeTruthy();
  });
});
