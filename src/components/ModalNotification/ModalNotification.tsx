import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import ReactLoading from 'react-loading';

import './ModalNotification.sass';
import { ModalType } from '../../types';

export type ModalNotificationProps = {
  id: ModalType;
  style?: string;
  visible?: boolean;
  loading?: boolean;
  close?: () => void;
  children?: ReactNode;
};

export const ModalNotification = (props: ModalNotificationProps) => {
  const { t } = useTranslation('modal-notification');
  const { id, style, visible, loading, close, children } = props;
  const className = classNames({ modal: true, 'is-active': visible });
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
          {typeof close === 'function' && <div className="delete" onClick={close}></div>}
          {content}
          {nestedContent}
          {loading && <ReactLoading className="modal-notification-loading" type="spin" />}
        </div>
      </div>
    </div>
  );
};
