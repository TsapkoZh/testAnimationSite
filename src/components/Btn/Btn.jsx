import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CursorContext from 'components/ContextWrapper';

class Btn extends PureComponent {
  handleClick = () => {
    const { onClick, cbData } = this.props;
    onClick(cbData);
  };

  render() {
    const { className, children } = this.props;

    return (
      <CursorContext.Consumer>
        {setMouse => (
          <div
            onMouseLeave={setMouse.mLeave}
            onMouseMove={setMouse.mMove}
            className={className}
            onClick={this.handleClick}
          >
            {children}
          </div>
        )}
      </CursorContext.Consumer>
    );
  }
}

Btn.propTypes = {
  cbData: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.object,
  onClick: PropTypes.func,
};

Btn.defaultProps = {
  cbData: null,
  className: null,
  children: null,
  onClick: null,
};

export default React.memo(Btn);
