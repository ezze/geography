import { reaction } from 'mobx';
import { observer } from 'mobx-react';
import { useContext, useEffect } from 'react';
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

  const { loading } = challengeStore;

  useEffect(() => {
    const disposeLoading = reaction(
      () => challengeStore.loading,
      (loading) => {
        if (loading && generalStore.modal === undefined) {
          generalStore.setModal(ModalType.Loading);
        } else if (generalStore.modal === ModalType.Loading) {
          generalStore.setModal(undefined);
        }
      }
    );

    const disposeLoadingError = reaction(
      () => challengeStore.loadingError,
      (loadingError) => {
        if (loadingError) {
          generalStore.setModal(ModalType.LoadingError);
        }
      }
    );

    const disposeModal = reaction(
      () => generalStore.modal,
      (modal, previousModal) => {
        if (modal === undefined && previousModal !== undefined) {
          if (challengeStore.loading) {
            generalStore.setModal(ModalType.Loading);
          }
        }
      }
    );

    return () => {
      disposeLoading();
      disposeLoadingError();
      disposeModal();
    };
  }, []);

  return (
    <>
      <ModalNotification id={ModalType.Loading} style="info" loading={loading} />
      <ModalNotification id={ModalType.LoadingError} style="danger">
        <div className="has-text-centered">
          <button className="button" onClick={onRetryClick}>
            {t('retry')}
          </button>
        </div>
      </ModalNotification>
    </>
  );
});
