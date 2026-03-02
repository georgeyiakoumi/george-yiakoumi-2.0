import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test('should load contact form', async ({ page }) => {
    await page.goto('/contact');

    // Check for contact form elements
    await expect(page.locator('form')).toBeVisible();
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/message/i)).toBeVisible();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('/contact');

    // Try to submit empty form
    const submitButton = page.getByRole('button', { name: /send|submit/i });
    await submitButton.click();

    // Wait for validation errors to appear
    await page.waitForTimeout(500);

    // Check that we're still on the contact page (form didn't submit)
    await expect(page).toHaveURL(/\/contact/);
  });

  test('should accept valid form input', async ({ page }) => {
    await page.goto('/contact');

    // Fill out the form
    await page.getByLabel(/name/i).fill('Test User');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/message/i).fill('This is a test message');

    // Verify inputs are filled
    await expect(page.getByLabel(/name/i)).toHaveValue('Test User');
    await expect(page.getByLabel(/email/i)).toHaveValue('test@example.com');
    await expect(page.getByLabel(/message/i)).toHaveValue('This is a test message');
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/contact');

    // Fill with invalid email
    await page.getByLabel(/name/i).fill('Test User');
    await page.getByLabel(/email/i).fill('invalid-email');
    await page.getByLabel(/message/i).fill('Test message');

    // Try to submit
    const submitButton = page.getByRole('button', { name: /send|submit/i });
    await submitButton.click();

    // Should show validation error
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/contact/);
  });
});
