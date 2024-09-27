import { observer } from 'mobx-react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { GeneralStoreContext } from '../../store/GeneralStore';
import { ModalType } from '../../types';
import { ModalNotification } from '../ModalNotification/ModalNotification';

import './About.sass';

// @ts-ignore
const version = VERSION;

export const About = observer(() => {
  const { t } = useTranslation('about');

  const generalStore = useContext(GeneralStoreContext);

  const { modal } = generalStore;

  return (
    <ModalNotification
      id={ModalType.About}
      visible={modal === ModalType.About}
      close={() => {
        generalStore.setModal(undefined);
      }}
    >
      <table className="about-table" align="center">
        <tbody>
          <tr>
            <td>{t('version')}</td>
            <td>{version}</td>
          </tr>
          <tr>
            <td>{t('authors')}</td>
            <td>{t('author-1')}</td>
          </tr>
          <tr>
            <td></td>
            <td>{t('author-2')}</td>
          </tr>
          <tr>
            <td>{t('browsers')}</td>
            <td>Google Chrome (Chromium)</td>
          </tr>
          <tr>
            <td></td>
            <td>Mozilla Firefox</td>
          </tr>
        </tbody>
      </table>
    </ModalNotification>
  );
});
