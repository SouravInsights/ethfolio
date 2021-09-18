export const truncateAddress = (addr: string | undefined) => {
  if (!addr) {
    return null;
  }
  if (addr.includes(".eth")) {
    return addr.slice(0, addr.length - 4);
  }
  return addr;
};