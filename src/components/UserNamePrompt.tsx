import { reaction } from 'mobx';
import { observer } from 'mobx-react';
import { ChangeEvent, FormEvent, MouseEvent, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ChallengeStoreContext } from '../store/ChallengeStore';
import { GeneralStoreContext } from '../store/GeneralStore';
import { ModalType } from '../types';

import { ModalNotification } from './ModalNotification/ModalNotification';

export const UserNamePrompt = observer(() => {
  const { t } = useTranslation('user-name');

  const generalStore = useContext(GeneralStoreContext);
  const challengeStore = useContext(ChallengeStoreContext);

  const [userName, setUserName] = useState(() => challengeStore.userName);

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUserName(event.target.value);
  };

  const onApplyClick = (event: MouseEvent | FormEvent): void => {
    event.preventDefault();
    if (!userName) {
      return;
    }
    challengeStore.setUserName(userName);
    generalStore.setModal(undefined);
  };

  const onCancelClick = (): void => {
    generalStore.setModal(undefined);
  };

  useEffect(() => {
    const disposeModal = reaction(
      () => generalStore.modal,
      (modal) => {
        if (modal === ModalType.UserName) {
          setUserName(challengeStore.userName);
        }
      }
    );

    return () => {
      disposeModal();
    };
  }, []);

  const cancelButton = challengeStore.userName ? (
    <button className="button is-danger" disabled={!challengeStore.userName} onClick={onCancelClick}>
      {t('cancel')}
    </button>
  ) : (
    ''
  );
  return (
    <ModalNotification id={ModalType.UserName}>
      <form onSubmit={onApplyClick}>
        <div className="field">
          <div className="control">
            <input className="input is-fullwidth" type="text" value={userName} onChange={onChange} />
          </div>
        </div>
        <div className="buttons is-right">
          <button className="button is-primary" disabled={!userName} onClick={onApplyClick}>
            {t('apply')}
          </button>
          {cancelButton}
        </div>
      </form>
    </ModalNotification>
  );
});
