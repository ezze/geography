import classNames from 'classnames';
import { observer } from 'mobx-react';
import { ReactNode, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ReactLoading from 'react-loading';

import { GeneralStoreContext } from '../../store/GeneralStore';
import { ModalType } from '../../types';

import './ModalNotification.sass';

export type ModalNotificationProps = {
  id: ModalType;
  style?: string;
  loading?: boolean;
  onClose?: () => void;
  children?: ReactNode;
};

export const ModalNotification = observer((props: ModalNotificationProps) => {
  const { id, style, loading, onClose, children } = props;

  const { t } = useTranslation('modal-notification');

  const generalStore = useContext(GeneralStoreContext);

  const className = classNames({ modal: true, 'is-active': generalStore.modal === id });
  const notificationClassName = classNames({ notification: true, [`is-${style}`]: !!style });

  let content;
  if (id) {
    const title = t(`${id}.title`, { defaultValue: '' });
    const text = t(`${id}.text`, { defaultValue: '' });
    content = (
      <div>
        {title ? <h1 className="title is-4">{title}</h1> : ''}
        <p>{text}</p>
      </div>
    );
  }

  const nestedContent = children && <div className="modal-notification-nested">{children}</div>;

  return (
    <div className={className}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className={notificationClassName}>
          <div
            className="delete"
            onClick={() => {
              generalStore.setModal(undefined);
              onClose?.();
            }}
          />
          {content}
          {nestedContent}
          {loading && <ReactLoading className="modal-notification-loading" type="spin" />}
        </div>
      </div>
    </div>
  );
});
