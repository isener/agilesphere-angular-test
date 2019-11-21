import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  fillFormAndSubmit(cityName: string) {
    element(by.css('[name="city"]')).sendKeys(cityName);
    element(by.css('.btn-primary')).click();
  }

  getErrorMessage() {
    return element(by.css('.alert-warning')).getText();
  }

  getLastAddedCityName() {
    return element(by.css('table.table tr:last-child td:first-child')).getText();
  }
}
