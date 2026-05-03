export class BookDetailPage {
  constructor(page) {
    this.page = page;
  }

  async waitForLoad() {
    await this.page.waitForURL(/\/books\?search=/, { timeout: 60000 });
  }

  async getFieldValue(fieldId) {
    const valueDiv = this.page.locator(`#${fieldId}-wrapper .col-md-9`);
    return (await valueDiv.innerText()).trim();
  }

  async getBookDetails() {
    const title = await this.getFieldValue("title");
    const author = await this.getFieldValue("author");
    const publisher = await this.getFieldValue("publisher");

    console.log(`📖 Title     : ${title}`);
    console.log(`✍️  Author    : ${author}`);
    console.log(`🏢 Publisher : ${publisher}`);

    return { title, author, publisher };
  }
}
