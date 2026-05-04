import type { PortfolioContent } from "./portfolio-types";
import portfolioJson from "../../content/portfolio.json";

export const portfolio = portfolioJson as PortfolioContent;

export function getPortfolio(): PortfolioContent {
  return portfolio;
}
