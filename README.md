# withHooksSupport

[![dependencies](https://img.shields.io/david/mDibyo/with-hooks-support.svg)](https://david-dm.org/mDibyo/with-hooks-support)
[![min](https://img.shields.io/bundlephobia/min/with-hooks-support.svg)](https://www.npmjs.com/package/with-hooks-support)
[![minzip](https://img.shields.io/bundlephobia/minzip/with-hooks-support.svg)](https://www.npmjs.com/package/with-hooks-support)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)
[![Greenkeeper badge](https://badges.greenkeeper.io/mDibyo/with-hooks-support.svg)](https://greenkeeper.io/)

Higher-order component for adding hooks support to class components. Check out the
[Code Sandbox Demo](https://codesandbox.io/s/rj85ql72nq).

```jsx
class FancyInput extends React.Component {
  render() {
    // `useFormInput` returns an object with `value` and `onChange` attributes.
    const inputProps = useFormInput();

    return <input {...inputProps} />;
  }
}

export default withHooksSupport(FancyInput);
```

## Usage

```bash
npm install with-hooks-support
```

Then import
```js
import withHooksSupport from 'with-hooks-support';
```

NOTE: The React Hooks feature is currently only available in certain alpha versions of React.
```bash
npm install react@^16.7.0-alpha.1
```

## Introduction

[React hooks](https://reactjs.org/docs/hooks-intro.html) (introduced in `react@16.7.0-alpha.1`) lets you use
state and other React features without writing a class ie. in functional components. The result is cleaner,
more readable code where the code for a single feature is colocated instead of being spread over several
life-cycle methods.

Now that you have rewritten all your features as custom hooks, how do you use them in your legacy class components?
Using the `withHooksSupport` higher order component, that's how!

Wrap your classes with `withHooksSupport`, and use hooks in the render method without any issues.

```jsx
class ClassComponent extends React.PureComponent {
  render() {
    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowResize = () => setWidth(window.innerWidth);
    useEffect(() => {
      window.addEventListener('resize', handleWindowResize);
      return () => window.removeEventListener('resize', handleWindowResize);
    });

    return <div>The window width is {width}</div>;
  }
}

export default withHooksSupport(ClassComponent);
```
Awesome!
