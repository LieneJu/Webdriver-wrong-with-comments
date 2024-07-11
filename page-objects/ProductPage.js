export class ProductPage {
  productInventoryContainer() {
    return $('#inventory_container');
  }

  productPageHeaderTitle() {
    return $('.title');
  }

  productInventoryList() {
    return $('.inventory_list').$$('.inventory_item');
  }

  productCartBadge() {
    return $('.shopping_cart_badge');
  }

  sortingOptionsButton() {
    return $('.product_sort_container');
  }

  sortingOptionValues() {
    return this.sortingOptionsButton().$$('option');
  }

  productList() {
    return this.productInventoryContainer().$$(
      '.inventory_list > .inventory_item',
    );
  }

  getProductItemName(id) {
    return this.productList()[id].$('.inventory_item_name');
  }

  getProductItemPrice(id) {
    return this.productList()[id].$('.inventory_item_price');
  }

  getProductItemByName(name) {
    return $(
      `//div[@class="inventory_item_name " and contains(text(), "${name}")]`,
    );
  }

  async getProductItemDescriptionByName(name) {
    const productList = await this.productList();

    for (let i = 0; i < productList.length; i++) {
      const productName = await this.getProductItemName(i).getText();

      if (productName === name) {
        return await productList[i].$('.inventory_item_desc').getText();
      }
    }
  }

  async getProductItemPriceByName(name) {
    const productList = await this.productList();

    for (let i = 0; i < productList.length; i++) {
      const productName = await this.getProductItemName(i).getText();

      if (productName === name) {
        return await productList[i].$('.inventory_item_price').getText();
      }
    }
  }

  async chooseSortingOption(sortingOption) {
    // Vajag filtru sarakstu elementu - check
    const optionList = await this.sortingOptionValues();
    // Vajag iziet cauri šim sarakstam un dabūt tekstu no šiem elementiem - check
    // Šo tekstu salīdzināt ar padoto vērtību - sortingOption - check
    // Ja vertība sakrīt ar eksistējošo vērtību tad uzspiest uz šo filtru - check

    for (let i = 0; i < optionList.length; i++) {
      const optionName = await optionList[i].getText();

      if (optionName === sortingOption) {
        await optionList[i].click();
      }
    }
  }

  async checkProductNameById(id, name) {
    // Vajag produkta elementu dabūt pēc indexa no saraksta
    const productName = await this.getProductItemName(id);
    // Salīdzināt dabūto elementu ar padoto name vērtību
    await expect(productName).toHaveText(name);
  }

  async validateProductDetails(dataTable) {
    const productList = await this.productList();

    for (let i = 0; i < productList.length; i++) {
      const actualProductName = await this.getProductItemName(i);
      const actualProductPrice = await this.getProductItemPrice(i);
      const expectedProductName = dataTable[i][0];
      const expectedProductPrice = dataTable[i][1];

      await expect(actualProductName).toHaveText(expectedProductName);
      await expect(actualProductPrice).toHaveText(expectedProductPrice);
    }
  }
}
