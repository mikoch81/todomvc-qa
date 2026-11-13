import { test, expect, type APIRequestContext } from "@playwright/test";
import { createApiContext } from "@todomvc-qa/framework-api";

// TodoMVC has no backend, so the API layer is shown on Restful-Booker, a public
// practice API with authentication and full CRUD. The login below is the one
// published in that API's documentation, not a secret.
const baseURL = process.env.BOOKING_API_BASE_URL ?? "https://restful-booker.herokuapp.com";
const CREDENTIALS = { username: "admin", password: "password123" };

interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: { checkin: string; checkout: string };
  additionalneeds: string;
}

// A fresh guest per test: the service is shared with everyone on the internet.
function newBooking(testTitle: string): Booking {
  return {
    firstname: "Showcase",
    lastname: `${testTitle.replace(/\W+/g, "-")}-${Date.now()}`,
    totalprice: 240,
    depositpaid: true,
    bookingdates: { checkin: "2030-05-01", checkout: "2030-05-04" },
    additionalneeds: "Breakfast",
  };
}

test.describe("Restful-Booker — bookings", () => {
  let api: APIRequestContext;

  test.beforeAll(async () => {
    api = await createApiContext(baseURL);
  });

  test.afterAll(async () => {
    await api.dispose();
  });

  async function create(booking: Booking): Promise<number> {
    const response = await api.post("/booking", { data: booking, headers: { Accept: "application/json" } });
    expect(response.status()).toBe(200);
    return (await response.json()).bookingid;
  }

  async function token(): Promise<string> {
    const response = await api.post("/auth", { data: CREDENTIALS });
    expect(response.status()).toBe(200);
    return (await response.json()).token;
  }

  const read = (id: number) => api.get(`/booking/${id}`, { headers: { Accept: "application/json" } });

  test("the service is up", async () => {
    expect((await api.get("/ping")).status()).toBe(201);
  });

  test("wrong credentials get no token", async () => {
    const response = await api.post("/auth", { data: { ...CREDENTIALS, password: "wrong" } });

    expect(await response.json()).toEqual({ reason: "Bad credentials" });
  });

  test("a created booking is returned as sent", async ({}, testInfo) => {
    const booking = newBooking(testInfo.title);

    const id = await create(booking);

    const response = await read(id);
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(booking);
  });

  test("a created booking is found by guest name", async ({}, testInfo) => {
    const booking = newBooking(testInfo.title);
    const id = await create(booking);

    const response = await api.get("/booking", {
      params: { firstname: booking.firstname, lastname: booking.lastname },
    });

    expect(await response.json()).toEqual([{ bookingid: id }]);
  });

  test("updating a booking needs a token", async ({}, testInfo) => {
    const booking = newBooking(testInfo.title);
    const id = await create(booking);

    const response = await api.put(`/booking/${id}`, { data: { ...booking, totalprice: 1 } });

    expect(response.status()).toBe(403);
    expect((await (await read(id)).json()).totalprice).toBe(booking.totalprice);
  });

  test("a token holder changes the price and the dates", async ({}, testInfo) => {
    const booking = newBooking(testInfo.title);
    const id = await create(booking);
    const changed = { ...booking, totalprice: 310, bookingdates: { checkin: "2030-06-10", checkout: "2030-06-12" } };

    const response = await api.put(`/booking/${id}`, {
      data: changed,
      headers: { Accept: "application/json", Cookie: `token=${await token()}` },
    });

    expect(response.status()).toBe(200);
    expect(await (await read(id)).json()).toEqual(changed);
  });

  test("a deleted booking is gone", async ({}, testInfo) => {
    const id = await create(newBooking(testInfo.title));

    const response = await api.delete(`/booking/${id}`, { headers: { Cookie: `token=${await token()}` } });

    expect(response.status()).toBe(201);
    expect((await read(id)).status()).toBe(404);
  });
});
