import * as React from "react";
import {
  CURRENCIES,
  CurrencyMeta,
  getActiveCurrency,
  setActiveCurrency,
  subscribeCurrencyChange,
  convertAndFormatPrice,
  parseNumericPrice,
} from "../utils/currency";

interface CurrencyContextType {
  activeCurrency: string;
  currencyMeta: CurrencyMeta;
  changeCurrency: (code: string) => void;
  formatPrice: (amountInUSD: number) => string;
  convertStringPrice: (priceStr: string, sourceCurrency?: string) => string;
}

const CurrencyContext = React.createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [activeCurrency, setActiveCurrencyState] = React.useState<string>(getActiveCurrency());

  React.useEffect(() => {
    return subscribeCurrencyChange(() => {
      setActiveCurrencyState(getActiveCurrency());
    });
  }, []);

  const currencyMeta = CURRENCIES[activeCurrency] || CURRENCIES.USD;

  const changeCurrency = React.useCallback((code: string) => {
    setActiveCurrency(code);
  }, []);

  const formatPrice = React.useCallback(
    (amountInUSD: number) => {
      return convertAndFormatPrice(amountInUSD, activeCurrency);
    },
    [activeCurrency]
  );

  const convertStringPrice = React.useCallback(
    (priceStr: string, sourceCurrency = "USD") => {
      if (!priceStr) return "$0.00";
      if (activeCurrency === "USD" && priceStr.startsWith("$")) {
        return priceStr;
      }
      const numUSD = parseNumericPrice(priceStr, sourceCurrency);
      return convertAndFormatPrice(numUSD, activeCurrency);
    },
    [activeCurrency]
  );

  const value = React.useMemo(
    () => ({
      activeCurrency,
      currencyMeta,
      changeCurrency,
      formatPrice,
      convertStringPrice,
    }),
    [activeCurrency, currencyMeta, changeCurrency, formatPrice, convertStringPrice]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): CurrencyContextType {
  const ctx = React.useContext(CurrencyContext);
  if (!ctx) {
    // Fallback if accessed outside provider
    const active = getActiveCurrency();
    const meta = CURRENCIES[active] || CURRENCIES.USD;
    return {
      activeCurrency: active,
      currencyMeta: meta,
      changeCurrency: setActiveCurrency,
      formatPrice: (amt) => convertAndFormatPrice(amt, active),
      convertStringPrice: (pStr, sCurr = "USD") => {
        if (!pStr) return "$0.00";
        const numUSD = parseNumericPrice(pStr, sCurr);
        return convertAndFormatPrice(numUSD, active);
      },
    };
  }
  return ctx;
}
