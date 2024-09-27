import { observer } from 'mobx-react';
import { useContext, useEffect, useState } from 'react';

import { modalErrors } from '../const';
import { ChallengeStoreContext } from '../store/ChallengeStore';
import { GeneralStoreContext } from '../store/GeneralStore';
import { ModalType } from '../types';

import { ModalNotification } from './ModalNotification/ModalNotification';

export const AudioNotification = observer(() => {
  const generalStore = useContext(GeneralStoreContext);
  const challengeStore = useContext(ChallengeStoreContext);

  const [previousModal, setPreviousModal] = useState<ModalType>();

  useEffect(() => {
    const { soundEnabled, developerMode, modal } = generalStore;
    if (soundEnabled && !developerMode && modal && !modalErrors.includes(modal)) {
      setPreviousModal(modal);
      generalStore.setModal(ModalType.AudioNotification);
    }
  }, []);

  const { modal } = generalStore;
  return (
    <ModalNotification
      id={ModalType.AudioNotification}
      style="warning"
      visible={modal === ModalType.AudioNotification}
      close={() => {
        if (!challengeStore.userName) {
          generalStore.setModal(ModalType.UserName);
        } else {
          generalStore.setModal(previousModal);
        }
        setPreviousModal(undefined);
      }}
    ></ModalNotification>
  );
});
