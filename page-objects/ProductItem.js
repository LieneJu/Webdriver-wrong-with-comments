export class ProductItem {
  productInventoryName() {
    return $('.inventory_details_name');
  }

  productInventoryDescription() {
    return $('.inventory_details_desc');
  }

  productInventoryPrice() {
    return $('.inventory_details_price');
  }

  async validateProductItemDetails(name, description, price) {
    const actualProductInventoryName = await this.productInventoryName();
    const actualProductInventoryDesc = await this.productInventoryDescription();
    const actualProductInventoryPrice = await this.productInventoryPrice();

    await expect(actualProductInventoryName).toHaveText(name);
    await expect(actualProductInventoryDesc).toHaveText(description);
    await expect(actualProductInventoryPrice).toHaveText(price);
  }
}
