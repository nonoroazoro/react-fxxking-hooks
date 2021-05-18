# react-fxxking-hooks

Collection of React Hooks.


## Install

> npm i -S [react-fxxking-hooks](https://www.npmjs.com/package/react-fxxking-hooks)


## Hooks

- **DOM**
    - [`useHover`](./src/useHover.ts) &mdash; Tracks the hover state via `mouseenter` and `mouseleave`, **supports debounce**.
    - [`useScroll`](./src/useScroll.ts) &mdash; Tracks the scroll state, **supports debounce**.

- **State**
    - [`useToggle`](./src/useToggle.ts) &mdash; Toggles `boolean` state.

- **Timer**
    - [`useInterval`](./src/useInterval.ts) &mdash; Hooks version of `setInterval`.
    - [`useTimeout`](./src/useTimeout.ts) &mdash; Hooks version of `setTimeout`.
    - [`useTimer`](./src/useTimer.ts) &mdash; Advanced timer which supports both `interval` and `timeout`.
