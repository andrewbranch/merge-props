import { MergeableProps } from './types';

// Note: this is all miserably bad TypeScript, but the compiler
// can’t quite make sense of what’s going on here yet. I think
// the type assertions I’m making make sense, but the compiler
// just can’t infer it. The inputs and outputs are useful, though,
// so I think it’s still worthwhile to be written in TypeScript.

function pushProp<K extends keyof MergeableProps>(
  target: MergeableProps,
  key: K,
  value: MergeableProps[K]
): void {
  if (key === 'className') {
    target.className = [target.className, value].join(' ').trim();
  } else if (key === 'style') {
    target.style = { ...target.style, ...(value as React.CSSProperties) };
  } else if (typeof value === 'function') {
    const oldFn = target[key] as Function | undefined;
    target[key] = oldFn ? (...args: any[]) => {
      oldFn(...args);
      (value as Function)(...args);
    } : value;
  } else if (!(key in target)) {
    target[key] = value;
  } else {
    throw new Error(
      `Didn’t know how to merge prop '${key}'. ` +
      `Only 'className', 'style', and event handlers are supported`
    );
  }
}

/**
 * Merges sets of props together:
 *  - duplicate `className` props get concatenated
 *  - duplicate `style` props get shallow merged (later props have precedence for conflicting rules)
 *  - duplicate functions (to be used for event handlers) get called in order from left to right
 * @param props Sets of props to merge together. Later props have precedence.
 */
export = function mergeProps<T extends MergeableProps>(...props: T[]): Required<T> {
  if (props.length === 1) {
    return props[0] as Required<T>;
  }

  return props.reduce((merged, ps) => {
    for (const key in ps) {
      pushProp(merged, key as keyof MergeableProps, ps[key]);
    }
    return merged;
  }, {}) as any;
}
