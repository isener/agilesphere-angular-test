import { AppPage } from './app.po';

describe('angular-weather App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();

    page.navigateTo();
  });

  it('when user submitting form with empty input they should see error', () => {
    page.fillFormAndSubmit('');

    expect(page.getErrorMessage()).toEqual('Please fill out field');
  });

  it('when user submitting form with wrong city name they should see error', () => {
    page.fillFormAndSubmit('Londland');

    expect(page.getErrorMessage()).toBeTruthy();
  });

  it('when user submitting form with correct city name they should see related data in table', () => {
    page.fillFormAndSubmit('London');

    expect(page.getLastAddedCityName()).toEqual('London');
  });
});
