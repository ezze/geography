import { observer } from 'mobx-react';
import { ReactNode, useContext } from 'react';

import './ChallengeItemLabel.sass';
import { translateItem } from '../../i18n/utils';
import { ChallengeStoreContext } from '../../store/ChallengeStore';
import { GeneralStoreContext } from '../../store/GeneralStore';

export const ChallengeItemLabel = observer(() => {
  const generalStore = useContext(GeneralStoreContext);
  const challengeStore = useContext(ChallengeStoreContext);

  const { language } = generalStore;
  const { playMode, guessedItem, pickedItem } = challengeStore;

  let content: ReactNode;
  if (playMode) {
    if (guessedItem) {
      content = translateItem(guessedItem.name, language);
    }
  } else {
    if (pickedItem) {
      content = translateItem(pickedItem.name, language);
    }
  }

  return content ? (
    <div className="challenge-item-label">
      <article className="message is-primary">
        <div className="message-body">{content}</div>
      </article>
    </div>
  ) : null;
});
