import Cesium from 'cesium';

// Language
export const languages = [
  { id: 'en', label: 'English' },
  { id: 'ru', label: 'Русский' }
];

// Camera
export const CAMERA_SCENE_MODE_2D = '2D';
export const CAMERA_SCENE_MODE_3D = '3D';
export const cameraMinHeight = 100.0;
export const cameraMaxHeight = 60000000.0;

// Challenge
export const challengeItemOpacity = 0.25;
export const challengeItemDefaultColor = Cesium.Color.fromCssColorString('#fff');
export const challengeItemDefaultFillColor = Cesium.Color.fromAlpha(challengeItemDefaultColor, challengeItemOpacity);
export const challengeItemPickedColor = Cesium.Color.fromCssColorString('#f4e10b');
export const challengeItemPickedFillColor = Cesium.Color.fromAlpha(challengeItemPickedColor, challengeItemOpacity);
export const challengeItemCorrectColor = Cesium.Color.fromCssColorString('#87d912');
export const challengeItemCorrectFillColor = Cesium.Color.fromAlpha(challengeItemCorrectColor, challengeItemOpacity);
export const challengeItemWrongColor = Cesium.Color.fromCssColorString('#ff5501');
export const challengeItemWrongFillColor = Cesium.Color.fromAlpha(challengeItemWrongColor, challengeItemOpacity);
export const challengeItemHiddenColor = Cesium.Color.fromAlpha(challengeItemDefaultColor, 0.004);
