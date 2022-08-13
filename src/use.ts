const PROMISE_STATUS = Symbol("PROMISE_STATUS");
const PROMISE_VALUE = Symbol("PROMISE_VALUE");
const PROMISE_REASON = Symbol("PROMISE_REASON");

/**
 * Get the value from the promise, or throw.
 * 
 * This function add some symbol properties to the promise.
 * 
 * @param promise 
 * @returns 
 * @see https://github.com/facebook/react/pull/25084
 */
export function use<T>(promise: Promise<T>): T {
  const modified = promise as any as Promise<T> & {
    [PROMISE_STATUS]: "pending" | "fulfilled" | "rejected";
    [PROMISE_VALUE]: T;
    [PROMISE_REASON]: unknown;
  };

  switch (modified[PROMISE_STATUS]) {
    case "fulfilled":
      return modified[PROMISE_VALUE];
    case "rejected":
      throw modified[PROMISE_REASON];
    case "pending":
      throw modified;
    default: {
      modified[PROMISE_STATUS] = "pending";

      throw modified.then(
        value => {
          modified[PROMISE_STATUS] = "fulfilled";
          modified[PROMISE_VALUE] = value;
        },
        reason => {
          modified[PROMISE_STATUS] = "rejected";
          modified[PROMISE_REASON] = reason;
        },
      );
    }
  }
}
