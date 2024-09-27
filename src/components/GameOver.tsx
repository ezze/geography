import { observer } from 'mobx-react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ChallengeStoreContext } from '../store/ChallengeStore';
import { GeneralStoreContext } from '../store/GeneralStore';
import { ModalType } from '../types';

import { ModalNotification } from './ModalNotification/ModalNotification';

export const GameOver = observer(() => {
  const { t } = useTranslation('game-over');

  const generalStore = useContext(GeneralStoreContext);
  const challengeStore = useContext(ChallengeStoreContext);

  const { gameOver, correctCount, overallCount, score } = challengeStore;

  return (
    <ModalNotification
      id={ModalType.GameOver}
      style="warning"
      visible={gameOver}
      close={() => {
        challengeStore.gameOver = false;
      }}
    >
      <h1 className="title is-4">{t('main')}</h1>
      <p>
        <b>{t('score', { score })}</b>
      </p>
      <p>{t('overall-count', { count: overallCount })}</p>
      <p>{t('correct-count', { count: correctCount })}</p>
      <p>{t('incorrect-count', { count: overallCount - correctCount })}</p>
      <p>&nbsp;</p>
      <div className="has-text-centered">
        <button
          className="button"
          onClick={() => {
            challengeStore.gameOver = false;
            generalStore.setModal(ModalType.Results);
          }}
        >
          {t('hall-of-fame')}
        </button>
      </div>
    </ModalNotification>
  );
});
