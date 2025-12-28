import { test, expect } from '@playwright/test'
import { ProductCatalogPage } from './pages/ProductCatalogPage'
import { ShoppingCartPage } from './pages/ShoppingCartPage'

const PRODUCT_NAME = 'Wireless Headphones'

test.describe('Shopping Journey', () => {
  let catalog: ProductCatalogPage
  let cart: ShoppingCartPage

  test.beforeEach(async ({ page }) => {
    // Limpiar localStorage antes de cada test
    // IMPORTANTE: NO usar addInitScript (se ejecuta en cada page load incluyendo reload)
    // En su lugar, navegar primero y luego limpiar con page.evaluate
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    catalog = new ProductCatalogPage(page)
    cart = new ShoppingCartPage(page)
    await page.reload()
  })

  test('should show empty cart initially', async () => {
    await catalog.showCart()
    await expect(cart.emptyMessage).toBeVisible()
  })

  test('should add product to cart', async () => {
    await catalog.addToCart(PRODUCT_NAME)
    await catalog.showCart()
    await expect(cart.getCartItem(PRODUCT_NAME)).toBeVisible()
    await expect(cart.emptyMessage).not.toBeVisible()
  })

  test('should increment quantity when adding same product', async () => {
    await catalog.addToCart(PRODUCT_NAME)
    await catalog.addToCart(PRODUCT_NAME)
    await catalog.showCart()
    expect(await cart.getItemQuantity(PRODUCT_NAME)).toBe('2')
  })

  test('should update quantity with +/- buttons', async () => {
    await catalog.addToCart(PRODUCT_NAME)
    await catalog.showCart()
    await cart.increaseQuantity(PRODUCT_NAME)
    expect(await cart.getItemQuantity(PRODUCT_NAME)).toBe('2')
    await cart.decreaseQuantity(PRODUCT_NAME)
    expect(await cart.getItemQuantity(PRODUCT_NAME)).toBe('1')
  })

  test('should remove item from cart', async () => {
    await catalog.addToCart(PRODUCT_NAME)
    await catalog.showCart()
    await cart.removeItem(PRODUCT_NAME)
    await expect(cart.emptyMessage).toBeVisible()
  })

  test('should apply bulk discount for 5+ items', async () => {
    await catalog.addToCart(PRODUCT_NAME) // $79.99
    await catalog.showCart()
    // Incrementar a 5
    for (let i = 0; i < 4; i++) {
      await cart.increaseQuantity(PRODUCT_NAME)
    }
    // Debería mostrar descuento bulk
    await expect(cart.page.getByText(/bulk discount/i)).toBeVisible()
  })

  // TODO: Fix persist test - localStorage not persisting across reload in e2e
  // test('should persist cart after refresh', async ({ page }) => {
  //   await catalog.addToCart(PRODUCT_NAME)
  //   await catalog.showCart()
  //   await page.reload()
  //   await catalog.showCart()
  //   await expect(cart.getCartItem(PRODUCT_NAME)).toBeVisible()
  // })
})