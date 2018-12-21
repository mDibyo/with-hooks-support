function withHook(useHook) {
  function WithHook({ children }) {
    const returnValue = useHook();
    if (typeof children === 'function') {
      return children(returnValue);
    }

    return children;
  }

  return WithHook;
}

export default withHook;
