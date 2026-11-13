import { test, expect } from "@playwright/test";
import { TodoPage } from "../pages/TodoPage";

const MILK = "buy milk";
const BILLS = "pay the bills";
const GYM = "book the gym";

test.describe("TodoMVC — managing todos", () => {
  let todos: TodoPage;

  test.beforeEach(async ({ page }) => {
    todos = new TodoPage(page);
    await todos.open();
  });

  test("adds todos in the order typed and counts them", async () => {
    await todos.add(MILK, BILLS, GYM);

    await expect(todos.items).toHaveText([MILK, BILLS, GYM]);
    await expect(todos.counter).toHaveText("3 items left");
    await expect(todos.newTodo).toBeEmpty();
  });

  test("ignores a todo that is only spaces", async () => {
    await todos.add("   ");

    await expect(todos.items).toHaveCount(0);
  });

  test("completing a todo strikes it and lowers the counter", async () => {
    await todos.add(MILK, BILLS);

    await todos.complete(MILK);

    await expect(todos.item(MILK)).toHaveClass(/completed/);
    await expect(todos.item(BILLS)).not.toHaveClass(/completed/);
    await expect(todos.counter).toHaveText("1 item left");
  });

  test("renames a todo on double click", async () => {
    await todos.add(MILK, BILLS);

    await todos.rename(MILK, "buy oat milk");

    await expect(todos.items).toHaveText(["buy oat milk", BILLS]);
  });

  test("deletes a todo", async () => {
    await todos.add(MILK, BILLS);

    await todos.remove(MILK);

    await expect(todos.items).toHaveText([BILLS]);
    await expect(todos.counter).toHaveText("1 item left");
  });

  test("filters active and completed todos", async () => {
    await todos.add(MILK, BILLS, GYM);
    await todos.complete(BILLS);

    await todos.filter("Active");
    await expect(todos.items).toHaveText([MILK, GYM]);

    await todos.filter("Completed");
    await expect(todos.items).toHaveText([BILLS]);

    await todos.filter("All");
    await expect(todos.items).toHaveCount(3);
  });

  test("clear completed removes only the completed todos", async () => {
    await todos.add(MILK, BILLS, GYM);
    await todos.complete(MILK);
    await todos.complete(GYM);

    await todos.clearCompletedButton.click();

    await expect(todos.items).toHaveText([BILLS]);
    await expect(todos.clearCompletedButton).toBeHidden();
  });

  test("keeps todos and their state after a page reload", async ({ page }) => {
    await todos.add(MILK, BILLS);
    await todos.complete(BILLS);

    await page.reload();

    await expect(todos.items).toHaveText([MILK, BILLS]);
    await expect(todos.item(BILLS)).toHaveClass(/completed/);
    await expect(todos.counter).toHaveText("1 item left");
  });
});
