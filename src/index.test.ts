import mergeProps from './index';

describe('mergeProps', () => {
  test('a single set of props is passed through', () => {
    const props = {
      onClick: () => {},
      onKeyDown: () => {},
      className: 'className'
    };

    expect(mergeProps(props)).toBe(props);
  });

  test('props of different names are combined', () => {
    const onClick = () => {};
    const onFocus = () => {};
    const onKeyDown = () => {};
    expect(mergeProps({ onClick }, { onFocus }, { onKeyDown })).toEqual({
      onClick,
      onFocus,
      onKeyDown
    });
  });

  test('classNames are concatenated', () => {
    expect(mergeProps({ className: 'one' }, { className: 'two' })).toEqual({
      className: 'one two'
    });
  });

  test('styles are merged', () => {
    expect(mergeProps(
      { style: { display: 'none' } },
      { style: { color: 'red' } }
    )).toEqual({
      style: {
        display: 'none',
        color: 'red'
      }
    });
  });

  test('duplicate event handlers are called in sequence', () => {
    let tape = '';
    const one = () => tape += 'one ';
    const two = () => tape += 'two ';
    const three = () => tape += 'three';
    mergeProps(
      { onClick: one },
      { onClick: two },
      { onClick: three }
    ).onClick();

    expect(tape).toBe('one two three');
  });

  test('arguments are passed to functions', () => {
    const argsCalled = {
      one: [null],
      two: [null]
    };

    const one = (...args: any[]) => argsCalled.one = args;
    const two = (...args: any[]) => argsCalled.two = args;
    const args = [{}, {}];
    mergeProps(
      { onClick: one },
      { onClick: two }
    ).onClick(...args);

    expect(argsCalled.one[0]).toBe(args[0]);
    expect(argsCalled.one[1]).toBe(args[1]);
    expect(argsCalled.two[0]).toBe(args[0]);
    expect(argsCalled.two[1]).toBe(args[1]);
  });

  test('first instance of unknown prop is passed through', () => {
    const unknown = {};
    expect(mergeProps({ unknown }).unknown).toBe(unknown);
  });

  test('second instance of unknown prop throws an error', () => {
    const unknown = {};
    expect(() => mergeProps(
      { unknown },
      { unknown })
    ).toThrow(/unknown/);
  })
});
