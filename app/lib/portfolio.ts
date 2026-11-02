import type { PortfolioContent } from "./portfolio-types";
import { parsePortfolio } from "./portfolio-schema";
import portfolioJson from "../../content/portfolio.json";

// Validated once at module load, so a broken CMS edit fails the build with a clear message.
export const portfolio: PortfolioContent = parsePortfolio(portfolioJson);

export function getPortfolio(): PortfolioContent {
  return portfolio;
}
