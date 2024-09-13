import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

import { MODAL_AUDIO_NOTIFICATION, MODAL_USER_NAME, modalErrors } from '../../const';
import ModalNotification from '../ModalNotification';

@inject('generalStore', 'challengeStore')
@observer
class AudioNotification extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    const { generalStore } = this.props;
    const { soundEnabled, developerMode, modal } = generalStore;
    if (soundEnabled && !developerMode && !modalErrors.includes(modal)) {
      this.previousModal = modal;
      generalStore.setModal(MODAL_AUDIO_NOTIFICATION);
    }
  }

  close() {
    const { generalStore, challengeStore } = this.props;
    if (!challengeStore.userName) {
      generalStore.setModal(MODAL_USER_NAME);
    } else {
      generalStore.setModal(this.previousModal);
    }
    delete this.previousModal;
  }

  render() {
    const { generalStore } = this.props;
    const { modal } = generalStore;
    return (
      <ModalNotification id="audio" style="warning" visible={modal === MODAL_AUDIO_NOTIFICATION} close={this.close} />
    );
  }
}

export default AudioNotification;
