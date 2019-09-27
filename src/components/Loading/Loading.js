import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import ReactLoading from 'react-loading';
import classNames from 'classnames';

import { getChallengeController } from '../../global';

@inject('generalStore', 'challengeStore') @observer
class Loading extends Component {
  render() {
    const { t, generalStore, challengeStore } = this.props;
    const { settingsVisible } = generalStore;
    const { loading, loadingError } = challengeStore;
    const className = classNames({
      modal: true,
      'is-active': !settingsVisible && (loading || loadingError)
    });
    const notificationClassName = classNames({
      notification: true,
      'is-info': !loadingError,
      'is-danger': loadingError
    });
    const content = loading ? (
      <ReactLoading className="loading" type="spin" />
    ) : (
      <div className="loading-error">
        <button className="button" onClick={this.onRetryClick}>{t('retry')}</button>
      </div>
    );
    return (
      <div className={className}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className={notificationClassName}>
            <div className="has-text-centered">
              {t(loadingError ? 'error' : 'challenge')}
            </div>
            {content}
          </div>
        </div>
      </div>
    );
  }

  onRetryClick() {
    const challengeController = getChallengeController();
    challengeController.load().catch(e => console.error(e));
  }
}

export default withTranslation('loading')(Loading);
