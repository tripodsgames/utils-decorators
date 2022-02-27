export function isPromise(obj: any): obj is Promise<any> {
  return !!(obj && obj.then !== undefined);
}

export function sleep(n: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, n));
}

export function isPropertyKey(obj: any): obj is PropertyKey {
  return typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'symbol';
}
