import React, { PureComponent } from 'react';
import { InView } from 'react-intersection-observer';

import PropTypes from 'prop-types';

class InViewComp extends PureComponent {
  onChange = inView => {
    const { onChange, cbData } = this.props;
    onChange(cbData, inView);
  };

  render() {
    const { cbData, children, onChange, ...otherProps } = this.props;

    return (
      <InView onChange={this.onChange} {...otherProps}>
        {children}
      </InView>
    );
  }
}

InViewComp.propTypes = {
  cbData: PropTypes.number,
  children: PropTypes.object,
  onChange: PropTypes.func,
};

InViewComp.defaultProps = {
  cbData: null,
  children: null,
  onChange: null,
};

export default React.memo(InViewComp);
