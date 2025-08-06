/**
 * Returns a promise waiting with [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout).
 *
 * @example
 *
 * await delay(1000);
 */
export const delay = (ms?: number): Promise<void> =>
  new Promise(res => setTimeout(res, ms))

/**
 * Returns a promise waiting with [microtask](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide).
 *
 * @example
 *
 * await microtask();
 */
export const microtask = (): Promise<void> =>
  new Promise(res => queueMicrotask(res))
