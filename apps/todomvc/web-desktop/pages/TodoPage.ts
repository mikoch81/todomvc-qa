import { BasePage } from "@todomvc-qa/framework-web";
import type { Locator, Page } from "@playwright/test";

const baseUrl = process.env.QAFF_WEB_BASE_URL ?? "https://demo.playwright.dev/todomvc";

/** The TodoMVC list: one page, so one page object. Assertions stay in the specs. */
export class TodoPage extends BasePage {
  readonly newTodo: Locator;
  readonly items: Locator;
  readonly counter: Locator;
  readonly clearCompletedButton: Locator;

  constructor(page: Page) {
    super(page);
    this.newTodo = page.getByPlaceholder("What needs to be done?");
    this.items = page.getByTestId("todo-item");
    this.counter = page.getByTestId("todo-count");
    this.clearCompletedButton = page.getByRole("button", { name: "Clear completed" });
  }

  async open(): Promise<void> {
    await this.navigate(baseUrl);
  }

  async add(...titles: string[]): Promise<void> {
    for (const title of titles) {
      await this.newTodo.fill(title);
      await this.newTodo.press("Enter");
    }
  }

  item(title: string): Locator {
    return this.items.filter({ hasText: title });
  }

  async complete(title: string): Promise<void> {
    await this.item(title).getByRole("checkbox").check();
  }

  async rename(title: string, newTitle: string): Promise<void> {
    await this.item(title).getByTestId("todo-title").dblclick();
    // While editing, the title text is gone from the row, so find the editor on the page.
    const editor = this.page.getByRole("textbox", { name: "Edit" });
    await editor.fill(newTitle);
    await editor.press("Enter");
  }

  async remove(title: string): Promise<void> {
    // The delete button only appears on hover.
    await this.item(title).hover();
    await this.item(title).getByRole("button", { name: "Delete" }).click();
  }

  async filter(name: "All" | "Active" | "Completed"): Promise<void> {
    await this.page.getByRole("link", { name, exact: true }).click();
  }
}
