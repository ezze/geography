import classNames from 'classnames';
import { observer } from 'mobx-react';
import { ChangeEvent, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { challenges } from '../challenges';
import { challengeDurations } from '../const';
import { Language } from '../i18n/types';
import { getLanguageLabel, translateItem } from '../i18n/utils';
import { ChallengeStoreContext } from '../store/ChallengeStore';
import { GeneralStoreContext } from '../store/GeneralStore';
import { ModalType } from '../types';

export const Settings = observer(() => {
  const { t } = useTranslation('settings');

  const generalStore = useContext(GeneralStoreContext);
  const challengeStore = useContext(ChallengeStoreContext);

  const { languages, language, soundEnabled, developerMode, modal } = generalStore;
  const { id: challengeId, duration, loading } = challengeStore;

  const onChallengeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    challengeStore.setChallenge(event.target.value);
  };

  const onDurationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    challengeStore.setDuration(Number(event.target.value));
  };

  const onLanguageChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    await generalStore.setLanguage(event.target.value as Language);
  };

  const onSoundEnabledChange = (event: ChangeEvent<HTMLInputElement>) => {
    generalStore.setSoundEnabled(event.target.checked);
  };

  const onCloseClick = () => {
    generalStore.setModal(undefined);
  };

  return (
    <div className={classNames('modal', { 'is-active': modal === ModalType.Settings })}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="panel">
          <p className="panel-heading">{t('title')}</p>
          <div className="panel-block">
            <div className="field">
              <label className="label">{t('challenge')}</label>
              <div className="control">
                <div className={classNames('select', 'is-fullwidth', { 'is-loading': loading })}>
                  <select value={challengeId} disabled={loading} onChange={onChallengeChange}>
                    {challenges
                      .filter((challenge) => challenge.enabled)
                      .map((challenge) => (
                        <option key={challenge.id} value={challenge.id}>
                          {translateItem(challenge.name, language)}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">{t('duration')}</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select value={duration} onChange={onDurationChange}>
                    {challengeDurations.concat(developerMode ? [0.1] : []).map((duration) => (
                      <option key={duration} value={duration}>
                        {duration}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">{t('language')}</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select value={language} onChange={onLanguageChange}>
                    {languages.map((language) => (
                      <option key={language} value={language}>
                        {getLanguageLabel(language)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="checkbox">
                <input type="checkbox" checked={soundEnabled} onChange={onSoundEnabledChange} />
                <span>{t('sound-enabled')}</span>
              </label>
            </div>
            <div className="buttons is-right">
              <button className="button is-primary" onClick={onCloseClick}>
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
