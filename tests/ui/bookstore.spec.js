import { test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import { BookStorePage } from "../../pages/BookStorePage.js";
import { BookDetailPage } from "../../pages/BookDetailPage.js";
import { saveBookDetails } from "../../utils/fileHelper.js";

const BOOK_TITLE = "Learning JavaScript Design Patterns";

test.describe("Book Store Application", () => {
  test("should login, search book, save details and logout", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const bookStorePage = new BookStorePage(page);
    const bookDetailPage = new BookDetailPage(page);

    // Navigate to login page and login
    await loginPage.navigate();
    await loginPage.login(process.env.DEMOQA_USERNAME, process.env.DEMOQA_PASSWORD);

    // Validate username and logout button are visible
    await loginPage.validateLoggedIn(process.env.DEMOQA_USERNAME);

    // Navigate to Book Store
    await bookStorePage.goToStore();

    // Search for the book
    await bookStorePage.searchBook(BOOK_TITLE);

    // Validate search result contains the book
    await bookStorePage.validateBookInResults(BOOK_TITLE);

    // Click on the book to open detail page
    await bookStorePage.clickBook(BOOK_TITLE);

    // Wait for book detail page to load
    await bookDetailPage.waitForLoad();

    // Get Title, Author and Publisher
    const details = await bookDetailPage.getBookDetails();

    // Print details to file
    await saveBookDetails(details);

    // Logout
    await loginPage.logout();
  });
});
