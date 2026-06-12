import { test, expect } from "@playwright/test";

test("contact rejects invalid payload", async ({ request }) => {
  const res = await request.post("/api/contact", {
    data: { name: "", email: "x", message: "" },
  });
  expect(res.status()).toBe(400);
});

test("contact handles valid payload (no real key → 502, or 200 if configured)", async ({
  request,
}) => {
  const res = await request.post("/api/contact", {
    data: {
      name: "Test",
      email: "test@example.com",
      message: "Hello there from tests.",
      company: "",
    },
  });
  expect([200, 502]).toContain(res.status());
});

test("honeypot filled → silently ok (200)", async ({ request }) => {
  const res = await request.post("/api/contact", {
    data: {
      name: "Bot",
      email: "bot@example.com",
      message: "spam spam spam spam",
      company: "filled",
    },
  });
  expect(res.status()).toBe(200);
});
