import { beforeEach, describe, expect, it } from "vitest";
import { getClientIp, rateLimit, resetRateLimits } from "@/lib/rate-limit";

describe("rateLimit", () => {
  beforeEach(resetRateLimits);

  it("blocks after the limit and reports when to retry", () => {
    expect(rateLimit("k", 2, 1000, 0).ok).toBe(true);
    expect(rateLimit("k", 2, 1000, 100).ok).toBe(true);
    const blocked = rateLimit("k", 2, 1000, 200);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfterSeconds).toBe(1);
  });

  it("allows requests again once the window has passed", () => {
    rateLimit("k", 1, 1000, 0);
    expect(rateLimit("k", 1, 1000, 500).ok).toBe(false);
    expect(rateLimit("k", 1, 1000, 1500).ok).toBe(true);
  });

  it("tracks keys independently", () => {
    rateLimit("a", 1, 1000, 0);
    expect(rateLimit("b", 1, 1000, 0).ok).toBe(true);
  });

  it("reads the client ip from proxy headers", () => {
    const req = new Request("http://x", { headers: { "x-forwarded-for": "1.2.3.4, 5.6.7.8" } });
    expect(getClientIp(req)).toBe("1.2.3.4");
    expect(getClientIp(new Request("http://x"))).toBe("unknown");
  });
});
