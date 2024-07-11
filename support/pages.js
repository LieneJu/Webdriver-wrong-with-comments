import { LoginPage } from '../page-objects/LoginPage.js';
import { ProductPage } from '../page-objects/ProductPage.js';
import { ProductItem } from '../page-objects/ProductItem.js';

class Pages {
  constructor() {
    this.loginPage = new LoginPage();
    this.productPage = new ProductPage();
    this.productItem = new ProductItem();
  }
}

export const pages = new Pages();
