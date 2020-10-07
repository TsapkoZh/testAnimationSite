import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Btn extends PureComponent {
  handleClick = () => {
    const { onClick, cbData } = this.props;
    onClick(cbData);
  };

  render() {
    const { className, children } = this.props;

    return (
      <div className={className} onClick={this.handleClick}>
        {children}
      </div>
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
