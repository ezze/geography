import { TranslationItem } from '../i18n/types';
import { CameraView } from '../types';

export type ChallengeItem = {
  id: string;
  name: string | TranslationItem;
  path: string;
};

export type Challenge = {
  id: string;
  name: string | TranslationItem;
  enabled: boolean;
  minimumZoomDistance?: number;
  view: CameraView;
  items: Array<ChallengeItem>;
};
