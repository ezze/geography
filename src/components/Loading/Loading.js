import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import { getChallengeController } from '../../global';
import ModalNotification from '../ModalNotification';

@inject('generalStore', 'challengeStore')
@observer
class Loading extends Component {
  render() {
    const { t, generalStore, challengeStore } = this.props;
    const { modal } = generalStore;
    const { loading, loadingError } = challengeStore;
    const content = !loading ? (
      <div className="has-text-centered">
        <button className="button" onClick={this.onRetryClick}>
          {t('retry')}
        </button>
      </div>
    ) : (
      ''
    );
    const modalId = loadingError ? 'loading-error' : 'loading';
    const modalStyle = loadingError ? 'danger' : 'info';
    const modalVisible = !modal && (loading || loadingError);
    return (
      <ModalNotification id={modalId} style={modalStyle} visible={modalVisible} loading={loading}>
        {content}
      </ModalNotification>
    );
  }

  onRetryClick() {
    const challengeController = getChallengeController();
    challengeController.load().catch((e) => console.error(e));
  }
}

export default withTranslation('loading')(Loading);
