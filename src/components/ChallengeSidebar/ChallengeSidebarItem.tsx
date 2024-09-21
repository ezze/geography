import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { translateItem } from '../../i18n/utils';
import { ChallengeStoreContext } from '../../store/ChallengeStore';
import { GeneralStoreContext } from '../../store/GeneralStore';

export type ChallengeSidebarItemProps = {
  id: string;
};

export const ChallengeSidebarItem = observer((props: ChallengeSidebarItemProps) => {
  const { id } = props;

  const generalStore = useContext(GeneralStoreContext);
  const challengeStore = useContext(ChallengeStoreContext);
  const item = challengeStore.item(id);

  const onMouseEnter = () => {
    challengeStore.setPickedItemId(id);
  };

  const onMouseLeave = () => {
    challengeStore.setPickedItemId(undefined);
  };

  if (!item) {
    return null;
  }

  const { language } = generalStore;
  const linkClassName = classNames({
    'is-active': challengeStore.pickedItemId === id
  });

  return (
    <li>
      <a className={linkClassName} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {translateItem(item.name, language)}
      </a>
    </li>
  );
});

export default ChallengeSidebarItem;
