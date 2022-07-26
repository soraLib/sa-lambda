/**
 * Returns a promise waiting with *setTimeout*.
 *
 * @example
 *
 * await delay(1000);
 */
export const delay = (ms?: number): Promise<void> =>
  new Promise(res => setTimeout(res, ms))


/**
 * Returns a promise waiting with *microtask*.
 *
 * @example
 *
 * await microtask();
 */
export const microtask = (): Promise<void> =>
  new Promise(res => queueMicrotask(res))
