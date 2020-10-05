import { Color } from 'cesium';
import Bowser from 'bowser';

const { parsedResult } = Bowser.getParser(window.navigator.userAgent);
export const platformType = parsedResult.platform.type;

// Language
export const languages = [
  { id: 'ru', label: 'Русский' },
  { id: 'en', label: 'English' }
];

// Sounds
export const SOUND_TYPE_SUCCESS = 'SOUND_TYPE_SUCCESS';
export const SOUND_TYPE_ERROR = 'SOUND_TYPE_ERROR';
export const SOUND_TYPE_PICK = 'SOUND_TYPE_PICK';
export const SOUND_TYPE_GAME_OVER = 'SOUND_TYPE_GAME_OVER';

export const soundTypes = [
  SOUND_TYPE_SUCCESS,
  SOUND_TYPE_ERROR,
  SOUND_TYPE_PICK,
  SOUND_TYPE_GAME_OVER
];

// Modal
export const MODAL_USER_NAME = 'MODAL_USER_NAME';
export const MODAL_SETTINGS = 'MODAL_SETTINGS';
export const MODAL_HALL_OF_FAME = 'MODAL_HALL_OF_FAME';
export const MODAL_AUDIO_NOTIFICATION = 'MODAL_AUDIO_NOTIFICATION';
export const MODAL_GLOBE_INITIALIZATION_ERROR = 'MODAL_GLOBE_INITIALIZATION_ERROR';
export const MODAL_GLOBE_RENDERING_ERROR = 'MODAL_GLOBE_RENDERING_ERROR';
export const MODAL_ABOUT = 'MODAL_ABOUT';
export const modalErrors = [
  MODAL_GLOBE_INITIALIZATION_ERROR,
  MODAL_GLOBE_RENDERING_ERROR
];

// Camera
export const CAMERA_SCENE_MODE_2D = '2D';
export const CAMERA_SCENE_MODE_3D = '3D';
export const cameraMinHeight = 100.0;
export const cameraMaxHeight = 60000000.0;

// Challenge
export const challengeRecordsCount = 5;
export const challengeDurations = [3, 5, 7, 10, 15];
export const challengeItemOpacity = 0.25;
export const challengeItemDefaultColor = Color.fromCssColorString('#fff');
export const challengeItemDefaultFillColor = Color.fromAlpha(challengeItemDefaultColor, challengeItemOpacity);
export const challengeItemPickedColor = Color.fromCssColorString('#f4e10b');
export const challengeItemPickedFillColor = Color.fromAlpha(challengeItemPickedColor, challengeItemOpacity);
export const challengeItemCorrectColor = Color.fromCssColorString('#87d912');
export const challengeItemCorrectFillColor = Color.fromAlpha(challengeItemCorrectColor, challengeItemOpacity);
export const challengeItemWrongColor = Color.fromCssColorString('#ff5501');
export const challengeItemWrongFillColor = Color.fromAlpha(challengeItemWrongColor, challengeItemOpacity);
export const challengeItemHiddenColor = Color.fromAlpha(challengeItemDefaultColor, 0.004);
