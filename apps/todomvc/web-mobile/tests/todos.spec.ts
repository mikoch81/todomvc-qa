import { test, expect, devices } from "@playwright/test";

test.use({ ...devices["Pixel 7"] });

const baseUrl = process.env.QAFF_WEB_BASE_URL ?? "https://demo.playwright.dev/todomvc";

test.describe("TodoMVC — mobile", () => {
  test("adds and completes a todo with touch input", async ({ page }) => {
    await page.goto(baseUrl);
    const newTodo = page.getByPlaceholder("What needs to be done?");
    const items = page.getByTestId("todo-item");

    await newTodo.tap();
    await newTodo.fill("call the plumber");
    await newTodo.press("Enter");
    await items.getByRole("checkbox").tap();

    await expect(items).toHaveText(["call the plumber"]);
    await expect(items).toHaveClass(/completed/);
    await expect(page.getByTestId("todo-count")).toHaveText("0 items left");
  });
});
