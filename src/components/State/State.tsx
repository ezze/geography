import { observer } from 'mobx-react';
import { useContext } from 'react';

import { ChallengeStoreContext } from '../../store/ChallengeStore';

import './State.sass';

export const State = observer(() => {
  const challengeStore = useContext(ChallengeStoreContext);
  const { playMode, remainingTimeDisplay, correctCount, overallCount, score } = challengeStore;
  return playMode ? (
    <div className="state">
      <div>{remainingTimeDisplay}</div>
      <div>
        <span className="state-score">{score}</span>{' '}
        <span>
          ({correctCount}/{overallCount})
        </span>
      </div>
    </div>
  ) : null;
});

export default State;
