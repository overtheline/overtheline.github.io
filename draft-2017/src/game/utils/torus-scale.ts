export default function torusScale(mod: number): (l: number) => number {
  return function modScale(l) {
    return (l % mod) < 0 ? (l % mod) + mod : l % mod;
  };
}
