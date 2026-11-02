import { describe, expect, it } from "vitest";
import { parsePortfolio } from "@/lib/portfolio-schema";
import portfolioJson from "../content/portfolio.json";

describe("portfolio.json", () => {
  it("matches the schema", () => {
    expect(() => parsePortfolio(portfolioJson)).not.toThrow();
  });

  it("reports readable errors for bad content", () => {
    expect(() => parsePortfolio({ ...portfolioJson, site: { ...portfolioJson.site, name: 1 } })).toThrow(/site\.name/);
  });
});
