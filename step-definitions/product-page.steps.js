import { Given, When, Then } from '@wdio/cucumber-framework';
import { pages } from '../support/pages.js';

When(/^User clicks on the Sorting button$/, async () => {
  await pages.productPage.sortingOptionsButton().waitForDisplayed({
    timeout: 10000,
  });
  await pages.productPage.sortingOptionsButton().click();
});

When(/^User chooses to sort by "([^"]*)"$/, async (sortingType) => {
  await pages.productPage.chooseSortingOption(sortingType);
});

Then(/^User sees first product "([^"]*)"$/, async (productName) => {
  await pages.productPage.checkProductNameById(0, productName);
});

Then(/^User sees correct product names and prices$/, async (data) => {
  // data.raw()
  // data.rows()
  // data.rowsHash()
  // data.hashes()
  await pages.productPage.validateProductDetails(data.rows());
});

When(/^User opens "([^"]*)" product$/, async function (name) {
  this.productName = name;
  this.productDescription =
    await pages.productPage.getProductItemDescriptionByName(name);
  this.productPrice = await pages.productPage.getProductItemPriceByName(name);

  await pages.productPage.getProductItemByName(name).waitForDisplayed({
    timeout: 10000,
  });
  await pages.productPage.getProductItemByName(name).click();
});

Then(/^User sees correct product details$/, async function () {
  await pages.productItem.validateProductItemDetails(
    this.productName,
    this.productDescription,
    this.productPrice,
  );
});
