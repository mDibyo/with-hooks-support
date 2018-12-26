import React from 'react';
import invariant from 'tiny-invariant';

function withHooksSupport(Component) {
  invariant(
    Component.prototype instanceof React.Component,
    `${Component.name} must inherit from React.Component.`
  );

  class ComponentWithHookSupport extends Component {
    render() {
      const RenderFn = super.render.bind(this);
      return <RenderFn />;
    }
  }

  return ComponentWithHookSupport;
}

export default withHooksSupport;
