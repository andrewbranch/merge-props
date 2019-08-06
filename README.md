# merge-props [![Build Status](https://travis-ci.org/andrewbranch/merge-props.svg?branch=master)](https://travis-ci.org/andrewbranch/merge-props) [![codecov](https://codecov.io/gh/andrewbranch/merge-props/branch/master/graph/badge.svg)](https://codecov.io/gh/andrewbranch/merge-props) [![npm](https://img.shields.io/npm/v/merge-props.svg)](https://www.npmjs.com/package/merge-props) ![size](https://img.shields.io/bundlephobia/minzip/merge-props.svg)

Merges React `className`, `style`, and event handlers (`onClick`, `onFocus`, `on{LiterallyEveryEvent}`) by the following rules:

- `className` props are concatenated
- `style` props are shallow merged with later values taking precedence
- functions are run in sequence from left to right.

## Installation

```
npm install merge-props
```

## Example usage

```js
const props = mergeProps(
  { onClick: fn1 },
  { onClick: fn2, className: 'blue' },
  { onClick: fn3, className: 'button', styles: { display: 'block' } },
  { styles: { display: 'flex', color: 'red' } }
);

<button {...props}>Best button ever</button>
```

The button will have a `className` of `"blue button"`, a `style` equal to `{ display: 'flex', color: 'red' }`,and when it is clicked, it will execute `fn1`, then `fn2`, then `fn3`, in that order.

## Why is this useful?

One useful pattern for [render props](https://reactjs.org/docs/render-props.html) is having them pass props that are meant to be spread over the returned element to facilitate communication between the parent component and the render prop element. For example, consider a Tooltip component that decorate any DOM element or React component that accepts event handlers. If the Tooltip wants to avoid rendering a wrapper around its “trigger” element, it could use a render prop to inject `onMouseEnter`, `onMouseLeave`, `onFocus`, `onBlur`, and various WAI-ARIA attributes:

```jsx
<Tooltip text="Some extra information about this button">
  {props => <button {...props}>Hovering this is great</button>}
</Tooltip>
```

This is a nifty pattern in environments where flexibility, reusability, and ability to customize are highly valued, because Tooltip can pass event handlers as `props` in order to attach what it needs to the target element while allowing the consumer to retain full control over what actually happens to those `props`.

However, one minor weakness of this pattern is the level of boilerplate that needs to be introduced if you needed to merge those injected `props` with props of your own in an intelligent way. For example, lets say that Tooltip also injects a `className` (perhaps to change the cursor appearance of whatever is being hovered), but you also need to pass your own `className` to the button in order to turn it a pretty shade of blue. You’d have to do something like

```jsx
<Tooltip text="Some extra information about this button">
  {({ className, ...props }) => (
    <button {...props} className={className + ' pretty-blue'}>
      Hovering this is great
    </button>
  )}
</Tooltip>
```

And it gets much messier if you needed to run your own event handlers in addition to the injected event handlers:

```jsx
<Tooltip text="Some extra information about this button">
  {({ className, onFocus, onBlur, ...props }) => (
    <button
      {...props}
      className={className + ' pretty-blue'}
      onFocus={event => {
        // BTW if Tooltip’s API changed to not inject this, it would break
        onFocus(event);
        myOwnOnFocus(event);
      }}
      onBlur={event => {
        onBlur(event); // Sure hope this exists forever
        myOwnOnBlur(event);
      }}
    >
      Hovering this is kind of sad
    </button>
  )}
</Tooltip>
```

Enter `mergeProps`:

```jsx
<Tooltip text="Some extra information about this button">
  {(props) => (
    <button {...mergeProps(props, {
      onFocus: myOwnOnFocus,
      onBlur: myOwnOnBlur,
      className: 'pretty-blue',
      style: { alignSelf: 'flex-start' }
    })}>
      I love button
    </button>
  )}
</Tooltip>
```

It runs Tooltip’s `onFocus` and `onBlur` right before your own handlers, combines Tooltip’s `className` with `pretty-blue`, and even merges your `style` prop with one that Tooltip might want to add.


## Gotchas

**I got an error like `Didn’t know how to merge prop 'foo'`. What?**

`mergeProps` knows how to merge `className`, `style`, and event handlers (any functions, in practice). If you pass it anything else, it will happily pass it through:

```jsx
const merged = mergeProps({ className: 'one' }, { className: 'two', role: 'button' });
merged.role; // 'button'
```

However, if it receives _two_ instances of the same prop by an unknown name, `mergeProps` is faced with a decision of how to merge two props that it knows nothing about. Rather than risk making a bad decision, especially one that may be hard to debug, it throws an error saying that it doesn’t know what to do:

```jsx
// What? How to merge two `role` props? ¯\_(ツ)_/¯ 
const merged = mergeProps({ role: 'button' }, { role: 'presentation' });
// Error: Didn’t know how to merge prop 'role'.
```

## Related

* [babel-plugin-jsx-merge-props](https://github.com/hooriza/babel-plugin-jsx-merge-props): Use merge-props automatically via a Babel plugin

## Contributing

Changes should be tested and have 100% coverage:

```
npm test
```

Design changes may be considered via an issue or PR.
