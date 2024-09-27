import classNames from 'classnames';
import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import './Toolbar.sass';
import { getChallengeController } from '../../global';
import { ChallengeStoreContext } from '../../store/ChallengeStore';
import { GeneralStoreContext } from '../../store/GeneralStore';
import { ModalType } from '../../types';

export const Toolbar = observer(() => {
  const { t } = useTranslation('toolbar');

  const generalStore = useContext(GeneralStoreContext);
  const challengeStore = useContext(ChallengeStoreContext);

  const { userName, playMode, challenge } = challengeStore;

  const onPlayModeClick = () => {
    challengeStore.setPlayMode(!challengeStore.playMode);
  };

  const onHallOfFameClick = () => {
    generalStore.setModal(ModalType.Results);
  };

  const onRestoreViewClick = async () => {
    const challengeController = getChallengeController();
    await challengeController.restoreView();
  };

  const onEditUserNameClick = () => {
    generalStore.setModal(ModalType.UserName);
  };

  const onSettingsClick = () => {
    generalStore.setModal(ModalType.Settings);
  };

  const onAboutClick = () => {
    generalStore.setModal(ModalType.About);
  };

  const className = classNames({
    toolbar: true,
    'toolbar-narrow': !playMode && !!challenge
  });

  const playModeButtonClassName = classNames({
    button: true,
    'is-primary': !playMode,
    'is-danger': playMode
  });

  return (
    <div className={className}>
      <div>
        <div className="field has-addons">
          <p className="control">
            <button
              className={playModeButtonClassName}
              title={t(playMode ? 'stop' : 'start')}
              onClick={onPlayModeClick}
            >
              <span className="icon">
                <i className={`fas fa-${playMode ? 'stop' : 'play'}`} />
              </span>
            </button>
          </p>
          <p className="control">
            <button className="button is-white" title={t('hall-of-fame')} onClick={onHallOfFameClick}>
              <span className="icon">
                <i className="fas fa-list" />
              </span>
            </button>
          </p>
        </div>
        <button className="button is-white" title={t('restore-view')} onClick={onRestoreViewClick}>
          <span className="icon">
            <i className="fas fa-eye" />
          </span>
        </button>
        <div className="field has-addons">
          <div className="control">
            <input className="toolbar-user-name input" disabled={true} value={userName} />
          </div>
          <div className="control">
            <button className="button is-primary" title={t('edit-user-name')} onClick={onEditUserNameClick}>
              <span className="icon">
                <i className="fas fa-edit" />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div>
        <button className="button is-white" title={t('settings')} onClick={onSettingsClick}>
          <span className="icon">
            <i className="fas fa-wrench" />
          </span>
        </button>
        <button className="button is-white" title={t('about')} onClick={onAboutClick}>
          <span className="icon">
            <i className="fas fa-question" />
          </span>
        </button>
      </div>
    </div>
  );
});
