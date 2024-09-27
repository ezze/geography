import { observer } from 'mobx-react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ChallengeStoreContext } from '../../store/ChallengeStore';
import { ResultStoreContext } from '../../store/ResultStore';
import { ModalType } from '../../types';
import { ModalNotification } from '../ModalNotification/ModalNotification';

import './HallOfFame.sass';

export const HallOfFame = observer(() => {
  const { t } = useTranslation('hall-of-fame');

  const challengeStore = useContext(ChallengeStoreContext);
  const resultStore = useContext(ResultStoreContext);

  const { id, name, duration } = challengeStore;
  const results = resultStore.get(id, duration);
  const table =
    results.length > 0 ? (
      <table className="hall-of-fame-table">
        <tbody>
          {results.map((record, i) => (
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
    <ModalNotification id={ModalType.Results}>
      <div className="notification is-warning">
        <p>{t('challenge', { name })}</p>
        <p>{t('duration', { duration })}</p>
      </div>
      {table}
    </ModalNotification>
  );
});
