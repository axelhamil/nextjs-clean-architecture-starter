import { Decimal } from "decimal.js";

export function roundToDecimals(value: number, decimals: number): number {
  return Number(new Decimal(value).toFixed(decimals));
}

export function formatCurrency(
  value: number,
  currency = "EUR",
  locale = "fr-FR",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}
