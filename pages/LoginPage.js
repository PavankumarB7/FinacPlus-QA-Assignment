import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;

    // Login form
    this.usernameInput = page.getByRole("textbox", { name: "UserName" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });

    // Profile page
    this.usernameLabel = page.locator("#userName-value");
    this.logoutButton = page.getByRole("button", { name: "Logout" });
  }

  async navigate() {
    await this.page.goto("/login");
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL(/\/profile/);
  }

  async validateLoggedIn(username) {
    await this.usernameLabel.waitFor({ state: "visible", timeout: 10000 });
    await expect(this.usernameLabel).toHaveText(username);
    await expect(this.logoutButton).toBeVisible();
    await expect(this.logoutButton).toHaveText("Logout");
  }

  async logout() {
    await this.page.goto("/profile");
    await this.logoutButton.click();
    await this.page.waitForURL(/\/login/);
  }
}
