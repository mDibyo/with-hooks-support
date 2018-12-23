import React from 'react';

function withHooksSupport(Component) {
  function Wrapper(renderFn) {
    return renderFn;
  }

  class ComponentWithHookSupport extends Component {
    render() {
      const FunctionWrapped = Wrapper(super.render.bind(this));
      return <FunctionWrapped />;
    }
  }

  return ComponentWithHookSupport;
}

export default withHooksSupport;
