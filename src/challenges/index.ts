import { africa } from './africa';
import { asia } from './asia';
import { europe } from './europe';
import { northAmerica } from './north-america';
import { russia } from './russia';
import { southAmerica } from './south-america';
import { Challenge } from './types';

export const challenges: ReadonlyArray<Challenge> = [russia, europe, asia, northAmerica, southAmerica, africa];
