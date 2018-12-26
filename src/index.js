import React from 'react';
import invariant from 'tiny-invariant';

function withHooksSupport(Component) {
  invariant(
    Component.prototype instanceof React.Component,
    `${Component.name} must inherit from React.Component.`
  );

  class ComponentWithHookSupport extends Component {
    constructor(props) {
      super(props);

      this.RenderFn = super.render.bind(this);
    }

    render() {
      return <this.RenderFn />;
    }
  }

  return ComponentWithHookSupport;
}

export default withHooksSupport;
