import { Cartesian3, DirectionUp, GeoJsonDataSource, HeadingPitchRollValues, Matrix4, Rectangle } from 'cesium';

export type CameraSceneMode = '2d' | '3d';

export type CameraCoordinateUnits = 'radians' | 'degrees';

export type CameraCartesianCoordinates = { x: number; y: number; z: number };
export type CameraCartographicCoordinates = {
  units: CameraCoordinateUnits;
  latitude: number;
  longitude: number;
  height: number;
};
export type CameraRectangleCoordinates = {
  units: CameraCoordinateUnits;
  north: number;
  south: number;
  west: number;
  east: number;
};

export type CameraVectorCoordinates = CameraCartesianCoordinates | CameraCartographicCoordinates;
export type CameraCoordinates = CameraVectorCoordinates | CameraRectangleCoordinates;

export type CameraOrientationVector = {
  direction: CameraVectorCoordinates;
  up: CameraVectorCoordinates;
};
export type CameraOrientationAngle = { heading: number; pitch: number; roll: number };
export type CameraOrientation = CameraOrientationVector | CameraOrientationAngle;

export type CameraView = {
  destination: CameraCoordinates;
  orientation?: CameraOrientationVector | CameraOrientationAngle;
};

export type CameraCartesianView = {
  destination: CameraCartesianCoordinates;
  orientation: { direction: CameraCartesianCoordinates; up: CameraCartesianCoordinates };
};

export type CesiumView = {
  destination: Cartesian3 | Rectangle;
  orientation?: HeadingPitchRollValues | DirectionUp;
  endTransform?: Matrix4;
  convert?: boolean;
};

export type CesiumCartesianView = {
  destination: Cartesian3;
  orientation: DirectionUp;
};

export type GeoObjectStyle = 'default' | 'picked' | 'correct' | 'wrong' | 'hidden';
export type GeoObject = GeoJsonDataSource & {
  style: GeoObjectStyle;
};

export type Result = {
  name: string;
  score: number;
  date: Date;
};

export enum ModalType {
  UserName = 'user-name',
  Settings = 'settings',
  Results = 'results',
  AudioNotification = 'audio-notification',
  Loading = 'loading',
  LoadingError = 'loading-error',
  GlobeInitializationError = 'globe-initialization-error',
  GlobeRenderingError = 'globe-rendering-error',
  About = 'about'
}

export const modalErrors = [ModalType.GlobeInitializationError, ModalType.GlobeRenderingError];
