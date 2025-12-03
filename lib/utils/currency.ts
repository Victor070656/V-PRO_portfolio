/**
 * Currency utility functions for NGN (Nigerian Naira)
 */

export interface CurrencyFormatOptions {
  showSymbol?: boolean;
  symbol?: string;
  decimals?: number;
}

/**
 * Format price in Nigerian Naira (NGN)
 */
export function formatPrice(
  amount: number,
  options: CurrencyFormatOptions = {}
): string {
  const {
    showSymbol = true,
    symbol = '₦',
    decimals = 0
  } = options;

  if (isNaN(amount)) {
    return showSymbol ? `${symbol}0` : '0';
  }

  // Format the number with specified decimal places
  const formattedNumber = new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);

  return showSymbol ? `${symbol}${formattedNumber}` : formattedNumber;
}

/**
 * Format price range (for showing original and sale prices)
 */
export function formatPriceRange(
  originalPrice: number,
  salePrice: number,
  options: CurrencyFormatOptions = {}
): { original: string; sale: string; savings?: { amount: string; percentage: number } } {
  const original = formatPrice(originalPrice, options);
  const sale = formatPrice(salePrice, options);

  let savings;
  if (originalPrice > salePrice) {
    const savingsAmount = originalPrice - salePrice;
    const savingsPercentage = Math.round((savingsAmount / originalPrice) * 100);

    savings = {
      amount: formatPrice(savingsAmount, { ...options, showSymbol: true }),
      percentage: savingsPercentage
    };
  }

  return { original, sale, savings };
}

/**
 * Parse price string to number (handles various formats)
 */
export function parsePrice(priceString: string): number {
  // Remove currency symbols and convert to number
  const cleaned = priceString.replace(/[₦$,]/g, '').replace(/,/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Get currency symbol
 */
export function getCurrencySymbol(): string {
  return '₦';
}

/**
 * Get currency code
 */
export function getCurrencyCode(): string {
  return 'NGN';
}