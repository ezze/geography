import Bowser, { Parser } from 'bowser';
import { Color } from 'cesium';

import { Language } from './i18n/types';
import { ModalType } from './types';

const browser: Parser.Parser = Bowser.getParser(window.navigator.userAgent);
export const platformType = browser.getBrowser();

// Language
export const languages: Array<{ id: Language; label: string }> = [
  { id: 'ru', label: 'Русский' },
  { id: 'en', label: 'English' }
];

// Sounds
export const SOUND_TYPE_SUCCESS = 'SOUND_TYPE_SUCCESS';
export const SOUND_TYPE_ERROR = 'SOUND_TYPE_ERROR';
export const SOUND_TYPE_PICK = 'SOUND_TYPE_PICK';
export const SOUND_TYPE_GAME_OVER = 'SOUND_TYPE_GAME_OVER';

export const soundTypes = [SOUND_TYPE_SUCCESS, SOUND_TYPE_ERROR, SOUND_TYPE_PICK, SOUND_TYPE_GAME_OVER];

// Modal
export const modalErrors = [ModalType.GlobeInitializationError, ModalType.GlobeRenderingError];

// Camera
export const cameraMinHeight = 100.0;
export const cameraMaxHeight = 60000000.0;

// Challenge
export const challengeRecordsCount = 5;
export const challengeDurations = [1, 3, 5, 7, 10, 15];
export const challengeItemOpacity = 0.25;
export const challengeItemDefaultColor = Color.fromCssColorString('#fff');
export const challengeItemDefaultFillColor = Color.fromAlpha(challengeItemDefaultColor, challengeItemOpacity);
export const challengeItemPickedColor = Color.fromCssColorString('#f4e10b');
export const challengeItemPickedFillColor = Color.fromAlpha(challengeItemPickedColor, challengeItemOpacity);
export const challengeItemCorrectColor = Color.fromCssColorString('#87d912');
export const challengeItemCorrectFillColor = Color.fromAlpha(challengeItemCorrectColor, challengeItemOpacity);
export const challengeItemWrongColor = Color.fromCssColorString('#ff5501');
export const challengeItemWrongFillColor = Color.fromAlpha(challengeItemWrongColor, challengeItemOpacity);
export const challengeItemHiddenColor = Color.fromCssColorString('#e4fdff');
export const challengeItemHiddenFillColor = Color.fromAlpha(challengeItemHiddenColor, challengeItemOpacity);
