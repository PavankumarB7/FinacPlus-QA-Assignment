import { expect } from "@playwright/test";

export class BookStorePage {
  constructor(page) {
    this.page = page;

    this.goToBookStoreButton = page.getByRole("button", { name: "Go To Book Store" });
    this.searchInput = page.getByPlaceholder("Type to search");
  }

  async goToStore() {
    await this.goToBookStoreButton.click();
    await this.page.waitForURL(/\/books/);
  }

  async searchBook(title) {
    await this.searchInput.fill(title);
  }

  getBookRow(title) {
    return this.page.getByRole("row").filter({ hasText: title });
  }

  async clickBook(title) {
    await this.page.getByRole("link", { name: title }).click();
  }

  async validateBookInResults(title) {
    const row = this.getBookRow(title);
    await expect(row).toBeVisible();
  }

  async getBookDetails(title) {
    const row = this.getBookRow(title);
    const bookTitle = await row.getByRole("cell").nth(1).textContent();
    const author = await row.getByRole("cell").nth(2).textContent();
    const publisher = await row.getByRole("cell").nth(3).textContent();

    return {
      title: bookTitle?.trim(),
      author: author?.trim(),
      publisher: publisher?.trim(),
    };
  }
}
