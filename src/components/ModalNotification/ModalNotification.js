import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './sass/index.sass';

class ModalNotification extends Component {
  static propTypes = {
    id: PropTypes.string,
    style: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    close: PropTypes.func
  };

  static defaultProps = {
    visible: false,
    loading: false
  };

  constructor(props) {
    super(props);
    this.onCloseClick = this.onCloseClick.bind(this);
  }

  render() {
    const { t, id, style, visible, loading, close } = this.props;
    const className = classNames({
      modal: true,
      'is-active': visible
    });
    const notificationClassName = classNames({
      notification: true,
      [`is-${style}`]: !!style
    });

    let content;
    if (id) {
      const title = t(`${id}.title`, { defaultValue: '' });
      const text = t(`${id}.text`, { defaultValue: '' });
      content = (
        <div>
          {title ? <h1 className="title is-4">{title}</h1> : ''}
          <p>{text}</p>
        </div>
      );
    }

    const nestedContent = this.props.children ? (
      <div className="modal-notification-nested">
        {this.props.children}
      </div>
    ) : '';

    return (
      <div className={className}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className={notificationClassName}>
            {typeof close === 'function' ? <div className="delete" onClick={this.onCloseClick}></div> : ''}
            {content}
            {nestedContent}
            {loading ? <ReactLoading className="modal-notification-loading" type="spin" /> : ''}
          </div>
        </div>
      </div>
    );
  }

  onCloseClick() {
    this.props.close();
  }
}

export default withTranslation('modal-notification')(ModalNotification);
