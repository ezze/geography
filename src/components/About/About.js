import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import { MODAL_ABOUT } from '../../const';
import ModalNotification from '../ModalNotification';

import './sass/index.sass';

const version = VERSION; // eslint-disable-line no-undef

@inject('generalStore')
@observer
class About extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  close() {
    this.props.generalStore.setModal(null);
  }

  render() {
    const { t, generalStore } = this.props;
    const { modal } = generalStore;
    return (
      <ModalNotification id="about" visible={modal === MODAL_ABOUT} close={this.close}>
        <table className="about-table" align="center">
          <tbody>
            <tr>
              <td>{t('version')}</td>
              <td>{version}</td>
            </tr>
            <tr>
              <td>{t('authors')}</td>
              <td>{t('author-1')}</td>
            </tr>
            <tr>
              <td></td>
              <td>{t('author-2')}</td>
            </tr>
            <tr>
              <td>{t('browsers')}</td>
              <td>Google Chrome (Chromium)</td>
            </tr>
            <tr>
              <td></td>
              <td>Mozilla Firefox</td>
            </tr>
          </tbody>
        </table>
      </ModalNotification>
    );
  }
}

export default withTranslation('about')(About);
