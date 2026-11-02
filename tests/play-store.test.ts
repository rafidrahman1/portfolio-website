import { describe, expect, it } from "vitest";
import { formatCount, getPlayStoreId, parseBucket } from "@/lib/play-store";

describe("play-store helpers", () => {
  it("parses download buckets", () => {
    expect(parseBucket("10K+")).toBe(10_000);
    expect(parseBucket("1,000+")).toBe(1000);
    expect(parseBucket("2.5M+")).toBe(2_500_000);
    expect(parseBucket("1B+")).toBe(1e9);
    expect(parseBucket("garbage")).toBe(0);
  });

  it("formats counts back into store-style labels", () => {
    expect(formatCount(500)).toBe("500+");
    expect(formatCount(10_000)).toBe("10K+");
    expect(formatCount(2_500_000)).toBe("2.5M+");
  });

  it("extracts the package id only from Play Store URLs", () => {
    expect(getPlayStoreId("https://play.google.com/store/apps/details?id=com.example.app")).toBe("com.example.app");
    expect(getPlayStoreId("https://example.com/?id=com.example.app")).toBeNull();
    expect(getPlayStoreId("not a url")).toBeNull();
  });
});
