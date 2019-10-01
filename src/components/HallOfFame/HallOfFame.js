import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';

import ModalNotification from '../ModalNotification';

import { MODAL_HALL_OF_FAME } from '../../constants';

@inject('generalStore', 'challengeStore') @observer
class HallOfFame extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  close() {
    const { generalStore } = this.props;
    generalStore.setModal(null);
  }

  getRecords() {
    const { challengeStore } = this.props;
    const { id, duration, records } = challengeStore;
    if (!records[id] || !records[id][`duration-${duration}`]) {
      return [];
    }
    return records[id][`duration-${duration}`];
  }

  render() {
    const { t, generalStore, challengeStore } = this.props;
    const { modal } = generalStore;
    const { name, duration } = challengeStore;
    const records = this.getRecords();
    const table = records.length > 0 ? (
      <table className="hall-of-fame-table">
        <tbody>
          {records.map((record, i) => (
            <tr key={i}>
              <td className="hall-of-fame-table-place">{i + 1}</td>
              <td className="hall-of-fame-table-name">{record.name}</td>
              <td className="hall-of-fame-table-score">{record.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div className="hall-of-fame-table has-text-centered">{t('no-results')}</div>
    );
    return (
      <ModalNotification id="hall-of-fame" visible={modal === MODAL_HALL_OF_FAME} close={this.close}>
        <p>{t('challenge', { name })}</p>
        <p>{t('duration', { duration })}</p>
        {table}
      </ModalNotification>
    );
  }
}

export default withTranslation('hall-of-fame')(HallOfFame);
