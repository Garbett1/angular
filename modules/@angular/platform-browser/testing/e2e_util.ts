import * as webdriver from 'selenium-webdriver';

declare var global;
declare var expect: Function;
export var browser: protractor.IBrowser = global['browser'];
export var $: cssSelectorHelper = global['$'];

export function clickAll(buttonSelectors) {
  buttonSelectors.forEach(function(selector) { $(selector).click(); });
}

export function verifyNoBrowserErrors() {
  // TODO(tbosch): Bug in ChromeDriver: Need to execute at least one command
  // so that the browser logs can be read out!
  browser.executeScript('1+1');
  browser.manage().logs().get('browser').then(function(browserLog) {
    var filteredLog = browserLog.filter(function(logEntry) {
      if (logEntry.level.value >= webdriver.logging.Level.INFO.value) {
        console.log('>> ' + logEntry.message);
      }
      return logEntry.level.value > webdriver.logging.Level.WARNING.value;
    });
    expect(filteredLog).toEqual([]);
  });
}
