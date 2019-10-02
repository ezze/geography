import React, { Component } from 'react';
import { reaction } from 'mobx';
import { inject, observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';

import ModalNotification from '../ModalNotification';

import { MODAL_USER_NAME } from '../../constants';

@inject('generalStore', 'challengeStore') @observer
class UserNamePrompt extends Component {
  state = {
    userName: ''
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onApplyClick = this.onApplyClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
  }

  componentDidMount() {
    const { generalStore, challengeStore } = this.props;
    this.setState({ userName: challengeStore.userName });
    this.disposeUserName = reaction(() => generalStore.modal, modal => {
      if (modal === MODAL_USER_NAME) {
        this.setState({ userName: challengeStore.userName });
      }
    });
  }

  componentWillUnmount() {
    this.disposeUserName();
  }

  onChange(event) {
    this.setState({ userName: event.target.value });
  }

  onApplyClick(event) {
    event.preventDefault();
    const { generalStore, challengeStore } = this.props;
    const { userName } = this.state;
    if (!userName) {
      return;
    }
    challengeStore.setUserName(userName);
    generalStore.setModal(null);
  }

  onCancelClick() {
    const { generalStore } = this.props;
    generalStore.setModal(null);
  }

  render() {
    const { userName } = this.state;
    const { t, generalStore, challengeStore } = this.props;
    const { modal } = generalStore;
    const cancelButton = challengeStore.userName ? (
      <button
        className="button is-danger"
        disabled={!challengeStore.userName}
        onClick={this.onCancelClick}
      >{t('cancel')}</button>
    ) : '';
    return (
      <ModalNotification id="user-name" visible={modal === MODAL_USER_NAME}>
        <form onSubmit={this.onApplyClick}>
          <div className="field">
            <div className="control">
              <input className="input is-fullwidth" type="text" value={userName} onChange={this.onChange} />
            </div>
          </div>
          <div className="buttons is-right">
            <button className="button is-primary" disabled={!userName} onClick={this.onApplyClick}>{t('apply')}</button>
            {cancelButton}
          </div>
        </form>
      </ModalNotification>
    );
  }
}

export default withTranslation('user-name')(UserNamePrompt);
