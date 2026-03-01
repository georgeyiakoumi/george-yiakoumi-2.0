import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to all main pages', async ({ page }) => {
    await page.goto('/');

    // Navigate to Portfolio
    await page.click('text=Portfolio');
    await expect(page).toHaveURL(/\/projects/);
    await expect(page.locator('h1')).toContainText(/Projects|Portfolio/i);

    // Navigate to Contact
    await page.click('text=Contact');
    await expect(page).toHaveURL(/\/contact/);
    await expect(page.locator('h1')).toContainText(/Contact/i);

    // Navigate to CV
    await page.click('text=CV');
    await expect(page).toHaveURL(/\/cv/);
  });

  test('should have working external links', async ({ page, context }) => {
    await page.goto('/');

    // Check LinkedIn link
    const linkedInLink = page.locator('a[href*="linkedin.com"]').first();
    if (await linkedInLink.isVisible()) {
      await expect(linkedInLink).toHaveAttribute('target', '_blank');
      await expect(linkedInLink).toHaveAttribute('rel', /noopener/);
    }

    // Check GitHub link
    const githubLink = page.locator('a[href*="github.com"]').first();
    if (await githubLink.isVisible()) {
      await expect(githubLink).toHaveAttribute('target', '_blank');
      await expect(githubLink).toHaveAttribute('rel', /noopener/);
    }
  });

  test('should preserve navigation state during theme toggle', async ({ page }) => {
    await page.goto('/projects');

    // Toggle theme
    const themeToggle = page.getByRole('button', { name: /toggle theme/i });
    await themeToggle.click();

    // Verify we're still on projects page
    await expect(page).toHaveURL(/\/projects/);
  });
});
