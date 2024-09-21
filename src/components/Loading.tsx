import { observer } from 'mobx-react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { getChallengeController } from '../global';
import { ChallengeStoreContext } from '../store/ChallengeStore';
import { GeneralStoreContext } from '../store/GeneralStore';
import { ModalType } from '../types';

import { ModalNotification } from './ModalNotification/ModalNotification';

export const Loading = observer(() => {
  const { t } = useTranslation('loading');

  const generalStore = useContext(GeneralStoreContext);
  const challengeStore = useContext(ChallengeStoreContext);

  const onRetryClick = () => {
    const challengeController = getChallengeController();
    challengeController.load().catch((e) => console.error(e));
  };

  const { modal } = generalStore;
  const { loading, loadingError } = challengeStore;
  const content = !loading ? (
    <div className="has-text-centered">
      <button className="button" onClick={onRetryClick}>
        {t('retry')}
      </button>
    </div>
  ) : (
    ''
  );
  const modalId = loadingError ? ModalType.LoadingError : ModalType.Loading;
  const modalStyle = loadingError ? 'danger' : 'info';
  const modalVisible = !modal && (loading || loadingError);
  return (
    <ModalNotification id={modalId} style={modalStyle} visible={modalVisible} loading={loading}>
      {content}
    </ModalNotification>
  );
});
