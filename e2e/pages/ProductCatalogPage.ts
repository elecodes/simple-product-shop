import { Page, Locator } from '@playwright/test'

const PRODUCT_CARD_TESTID = '[data-testid="product-card"]'

export class ProductCatalogPage {
  readonly page: Page
  readonly heading: Locator
  readonly productCards: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole('heading', { name: /products/i })
    this.productCards = page.locator(PRODUCT_CARD_TESTID)
  }

  async goto() {
    await this.page.goto('/')
  }

  async addToCart(productName: string) {
    const card = this.page.locator(PRODUCT_CARD_TESTID, { hasText: productName })
    await card.getByRole('button', { name: /add to cart/i }).click()
  }

  async showCart() {
    await this.page.getByRole('button', { name: /^Cart/ }).click()
  }

  getProduct(productName: string) {
    return this.page.locator(PRODUCT_CARD_TESTID, { hasText: productName })
  }
}