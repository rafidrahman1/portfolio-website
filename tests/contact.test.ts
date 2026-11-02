import { describe, expect, it } from "vitest";
import { escapeHtml } from "@/lib/html";
import { validateContact } from "@/lib/contact-validation";

const valid = { name: "Ada", email: "ada@example.com", subject: "Hi", message: "Hello there" };

describe("escapeHtml", () => {
  it("neutralizes markup", () => {
    expect(escapeHtml(`<img src=x onerror="a()">&'`)).toBe("&lt;img src=x onerror=&quot;a()&quot;&gt;&amp;&#39;");
  });
});

describe("validateContact", () => {
  it("accepts and trims a valid payload", () => {
    const r = validateContact({ ...valid, name: "  Ada  " });
    expect(r).toEqual({ ok: true, value: valid });
  });

  it("rejects missing, non-string and oversized fields", () => {
    expect(validateContact(null).ok).toBe(false);
    expect(validateContact({ ...valid, message: "" }).ok).toBe(false);
    expect(validateContact({ ...valid, name: 5 }).ok).toBe(false);
    expect(validateContact({ ...valid, message: "x".repeat(5001) }).ok).toBe(false);
  });

  it("rejects invalid emails and header injection", () => {
    expect(validateContact({ ...valid, email: "nope" }).ok).toBe(false);
    expect(validateContact({ ...valid, subject: "Hi\r\nBcc: evil@example.com" }).ok).toBe(false);
  });
});
