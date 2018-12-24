import React from 'react';
import invariant from 'tiny-invariant';

function withHooksSupport(Component) {
  invariant(
    Component.prototype instanceof React.Component,
    `${Component.name} must inherit from React.Component.`
  );

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
