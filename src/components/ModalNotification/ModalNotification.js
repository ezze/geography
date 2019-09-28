import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class ModalNotification extends Component {
  static propTypes = {
    id: PropTypes.string,
    style: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
  };

  static defaultProps = {
    style: 'info',
    isOpen: false
  };

  constructor(props) {
    super(props);
    this.onCloseClick = this.onCloseClick.bind(this);
  }

  render() {
    const { t, id, style, isOpen } = this.props;
    const className = classNames({
      modal: true,
      'is-active': isOpen
    });
    const notificationClassName = classNames({
      notification: true,
      [`is-${style}`]: true
    });
    let content;
    if (id) {
      const title = t(`${id}.title`, { defaultValue: '' });
      const text = t(`${id}.text`);
      content = (
        <div>
          {title ? <h1 className="title is-4">{title}</h1> : ''}
          <p>{text}</p>
        </div>
      );
    }
    else {
      content = this.props.children;
    }
    return (
      <div className={className}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className={notificationClassName}>
            <div className="delete" onClick={this.onCloseClick}></div>
            {content}
          </div>
        </div>
      </div>
    )
  }

  onCloseClick() {
    this.props.close();
  }
}

export default withTranslation('modal-notification')(ModalNotification);
