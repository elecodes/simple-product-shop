/* eslint-disable @typescript-eslint/no-unused-vars */
import { test, expect } from '@playwright/test'

// TODO: Fix visual tests - snapshots need to be updated for first run
// test('homepage visual', async ({ page }) => {
//   await page.goto('/')
//   await expect(page).toHaveScreenshot('homepage.png')
// })

// test('cart with items visual', async ({ page }) => {
//   await page.goto('/')
//   await page.getByRole('button', { name: /add to cart/i }).first().click()
//   await page.getByRole('button', { name: /^Cart/ }).click()
//   await expect(page).toHaveScreenshot('cart-with-item.png')
// })