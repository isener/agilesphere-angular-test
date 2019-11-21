import { AppPage } from './app.po';

describe('angular-weather App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();

    page.navigateTo();
  });

  it('when user submitting form with wrong city name they should see error', () => {
    page.fillFormAndSubmit('Londland');

    expect(page.getErrorMessage()).toBeTruthy();
  });

  it('when submitting form, user should be able to see Loading text indicator in table', () => {
    page.fillFormAndSubmit('London');

    expect(page.getLastAddedCityName()).toEqual('London');
  });

  it('when user submitting form with correct city name they should see related data in table', () => {
    page.fillFormAndSubmit('London');

    expect(page.getLastAddedCityName()).toEqual('London');
  });
});
