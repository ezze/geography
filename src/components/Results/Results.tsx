import { observer } from 'mobx-react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ChallengeStoreContext } from '../../store/ChallengeStore';
import { ResultStoreContext } from '../../store/ResultStore';
import { ModalType } from '../../types';
import { ModalNotification } from '../ModalNotification/ModalNotification';

import './Results.sass';

export const Results = observer(() => {
  const { t } = useTranslation('results');

  const challengeStore = useContext(ChallengeStoreContext);
  const resultStore = useContext(ResultStoreContext);

  const { id, name, duration } = challengeStore;
  const results = resultStore.get(id, duration);
  const table =
    results.length > 0 ? (
      <table className="results-table">
        <tbody>
          {results.map((record, i) => (
            <tr key={i}>
              <td className="results-table-place">{i + 1}</td>
              <td className="results-table-name">{record.name}</td>
              <td className="results-table-score">{record.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div className="results-table has-text-centered">{t('no-results')}</div>
    );

  return (
    <ModalNotification id={ModalType.Results}>
      <div className="notification is-warning">
        <p>{t('challenge', { name })}</p>
        <p>{t('duration', { duration })}</p>
      </div>
      {table}
    </ModalNotification>
  );
});
