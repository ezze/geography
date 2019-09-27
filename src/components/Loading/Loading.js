import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import ReactLoading from 'react-loading';
import classNames from 'classnames';

@inject('generalStore', 'challengeStore') @observer
class Loading extends Component {
  render() {
    const { t, generalStore, challengeStore } = this.props;
    const { settingsVisible } = generalStore;
    const { loading } = challengeStore;
    const className = classNames({
      modal: true,
      'is-active': !settingsVisible && loading
    });
    return (
      <div className={className}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="notification is-info">
            <div className="has-text-centered">
              {t('challenge')}
            </div>
            <ReactLoading className="loading" type="spin" />
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation('loading')(Loading);
