// spin up test server
const server = require("./testserver");


const { Builder, By, Key, until } = require("selenium-webdriver");
const selenium = require("selenium-webdriver");

const browser = process.env.BROWSER || 'chrome';
console.log(`automating browser: ${browser}`);
let driverBrowser = require(`selenium-webdriver/${browser}`);
if(browser === 'chrome') {
    let chromedriver = require("chromedriver");
    driverBrowser.setDefaultService(new driverBrowser.ServiceBuilder(chromedriver.path).build());
} else if(browser =='firefox') {
    let gecko = require("geckodriver");
   // driverBrowser.setDefaultService(new driverBrowser.ServiceBuilder(gecko.path).build());
}


async function getElement(script, driver) {
  return driver.executeScript(`return ${script}`);
}

const site = `http://${server.HOST}:${server.PORT}`;

// demo test

async function test1(driver) {

    await driver.wait(
      until.elementIsVisible(
        await getElement(`document.querySelector('test-element')`, driver)
      )
    );
    console.log("test-element found");

    // check the output text
    const clickedTimes = await getElement(
      `document.querySelector('test-element').shadowRoot.querySelector('#output')`,
      driver
    );

    await driver.wait(until.elementTextIs(clickedTimes, "0"));
    // just waiting so easier to see
    await driver.sleep(1000);
    console.log(`clicked times are: ${await clickedTimes.getText()}`);

    const button = await getElement(
      `document.querySelector('test-element').shadowRoot.querySelector('#btn')`,
      driver
    );
    await button.click();
    await driver.sleep(1000);

    const clickedTimes2 = await getElement(
      `document.querySelector('test-element').shadowRoot.querySelector('#output')`,
      driver
    );

    await driver.wait(until.elementTextIs(clickedTimes2, "1"));
    console.log(`clicked times are: ${await clickedTimes2.getText()}`);

    console.log('test 1: success')
}

const seleniumServer = process.env.REMOTE_SERVER;
let driver;
(async function example() {
  try {
    await server.start();
    const builder = new selenium.Builder();
    if (seleniumServer) {
      builder.usingServer(seleniumServer);
    }
    builder
      .forBrowser(browser);
    driver = builder.build();
    console.log(`opening site to page: ${site}`);
    await driver.get(site);
    console.log('Navigated to web site');
    await driver.wait(until.titleIs("Test Shadow Root"), 1000);

    await test1(driver);

    await driver.sleep(2000);
  }
  finally {
    if (driver) {
      await driver.quit();
    }
    server.stop();
  }
})();
