import { Page, Locator } from '@playwright/test'

export class ShoppingCartPage {
  readonly page: Page
  readonly heading: Locator
  readonly emptyMessage: Locator
  readonly checkoutButton: Locator
  readonly subtotal: Locator
  readonly total: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole('heading', { name: /shopping cart/i })
    this.emptyMessage = page.getByText(/your cart is empty/i)
    this.checkoutButton = page.getByRole('button', { name: /checkout/i })
    this.subtotal = page.getByTestId('subtotal')
    this.total = page.getByTestId('total')
  }

  getCartItem(productName: string) {
    return this.page.locator('[data-testid="cart-item"]', { hasText: productName })
  }

  async increaseQuantity(productName: string) {
    const item = this.getCartItem(productName)
    await item.getByRole('button', { name: /increase/i }).click()
  }

  async decreaseQuantity(productName: string) {
    const item = this.getCartItem(productName)
    await item.getByRole('button', { name: /decrease/i }).click()
  }

  async removeItem(productName: string) {
    const item = this.getCartItem(productName)
    await item.getByRole('button', { name: /remove/i }).click()
  }

  async getItemQuantity(productName: string) {
    const item = this.getCartItem(productName)
    return item.getByTestId('quantity').first().textContent()
  }
}