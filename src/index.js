import React from 'react';
import invariant from 'tiny-invariant';

function withHooksSupport(Component) {
  const componentName = Component.displayName || Component.name;

  invariant(
    Component.prototype instanceof React.Component,
    `${componentName} must inherit from React.Component.`
  );

  class ComponentWithHookSupport extends Component {
    static displayName = `withHooksSupport(${componentName})`;

    constructor(props) {
      super(props);

      this.RenderFn = super.render.bind(this);
      this.RenderFn.displayName = `${componentName}.render`;
    }

    render() {
      return <this.RenderFn />;
    }
  }

  return ComponentWithHookSupport;
}

export default withHooksSupport;
