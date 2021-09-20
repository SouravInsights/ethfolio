export const cleanAddress = (addr: string | undefined) => {
  if (!addr) {
    return null;
  }
  if (addr.includes(".eth")) {
    return addr.slice(0, addr.length - 4);
  }
  return addr;
};

export const truncateAddress = (addr: string): string => `${addr?.slice(0, 6)}...${addr.slice(-4)}`;

export const dollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const valueFormatter = (num: number, decimalPlaces: number) =>
  Number(
    Math.round(Number(num + "e" + decimalPlaces)) + "e" + decimalPlaces * -1
  );