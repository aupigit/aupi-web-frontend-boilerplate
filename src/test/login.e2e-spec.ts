import { expect, test } from '@playwright/test'

test.describe('Login Form Tests', () => {
  test('sign in successfully', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'networkidle' })
    await page.fill(
      'input[placeholder="Insira seu usuário"]',
      'root@aupi.com.br',
    )
    await page.fill('input[placeholder="Insira sua senha"]', 'root')
    await page.click('button:has-text("Entrar")')

    await expect(page.locator('text=Usuário logado com sucesso.')).toBeVisible()
  })

  test('sign in with invalid credentials', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'networkidle' })
    await page.fill(
      'input[placeholder="Insira seu usuário"]',
      'erro@aupi.com.br',
    )
    await page.fill('input[placeholder="Insira sua senha"]', 'erro')
    await page.click('button:has-text("Entrar")')

    await expect(
      page.locator('text=Login falhou! Verifique suas credenciais.'),
    ).toBeVisible()
  })
})
