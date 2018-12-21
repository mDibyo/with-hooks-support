function withHook(useHook) {
  function WithHook({ children }) {
    const returnValue = useHook();
    return children(returnValue);
  }

  return WithHook;
}

export default withHook;
