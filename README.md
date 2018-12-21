# withHook

Higher-order component for unlocking React Hooks inside class components.

```jsx
class FancyInput extends React.Component {
  render() {
    // `useFormInput` returns an object with `value` and `onChange` attributes.
    const WithFormInput = withHook(useFormInput);

    return (
      <WithFormInput>
        {inputProps => <input {...inputProps} />}
      </WithFormInput>
    );
  }
}
```

Check out the [Code Sandbox Demo](https://codesandbox.io/s/1rzlv358p7)!

## Usage

```bash
npm install with-hook
```

Then import
```js
import withHook from 'with-hook';
```

## Introduction

[React hooks](https://reactjs.org/docs/hooks-intro.html) (introduced in `react@17.0.0-alpha`) lets you use
state and other React features without writing a class ie. in functional components. The result is cleaner,
more readable code where the code for a single feature is colocated instead of being spread over several
life-cycle methods.

Now that you have rewritten all your features as hooks, how do you use them in your legacy class components?
Using the `withHook` higher order component, that's how!

Consider the following functional component:
```jsx
function FunctionalComponent() {
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  });

  return <div>The window width is {width}</div>;
}
```

We can add the same hooks code to our class component:
```jsx
class ClassComponent extends React.PureComponent {
  render() {
    const WithWindowWidth = withHook(() => {
      const [width, setWidth] = useState(window.innerWidth);
      const handleWindowResize = () => setWidth(window.innerWidth);
      useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
      });

      return width;
    });

    return (
      <WithWindowWidth>{width => <div>The window width is {width}</div>}</WithWindowWidth>
    );
  }
}
```

Now if we were to refactor all our hooks code into a custom hook
```jsx
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  });

  return width;
}
```

We can write our components like so:
```jsx
function FunctionalComponent() {
  const width = useWindowWidth();

  return <div>The window width is {width}</div>;
}

class ClassComponent extends React.PureComponent {
  render() {
    const WithWindowWidth = withHook(useWindowWidth);

    return (
      <WithWindowWidth>
        {width => <div>The window width is {width}</div>}
      </WithWindowWidth>
    );
  }
}
```

### Special case: Hooks that don't return a value

Now, suppose you don't care about the return value for a hook.
The child to the hook component can be a normal component instead of a render function.
```jsx
class AwesomeTextarea extends React.Component {
  constructor(props) {
    super(props);
    this.textareaRef = React.createRef();
  }

  render() {
    const WithAutosizing = withHook(() => useAutosizingTextarea(this.textareaRef));
    return (
      <WithAutosizing>
        <textarea ref={this.textareaRef} />
      <WithAutosizing>
    );
  }
}
```
Awesome!
