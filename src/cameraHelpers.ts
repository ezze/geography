import { Cartesian3, DirectionUp, HeadingPitchRollValues, Math as CesiumMath, Rectangle } from 'cesium';

import {
  CameraCartesianCoordinates,
  CameraCartographicCoordinates,
  CameraCoordinates,
  CameraOrientation,
  CameraVectorCoordinates,
  CameraRectangleCoordinates,
  CameraView,
  CesiumView,
  CesiumCartesianView,
  CameraCartesianView
} from './types';

export function parseCartesianCoordinates(coordinates: CameraCartesianCoordinates): Cartesian3 {
  const { x, y, z } = coordinates;
  return Cartesian3.fromArray([x, y, z]);
}

export function parseCameraCartographicCoordinates(coordinates: CameraCartographicCoordinates): Cartesian3 {
  const { units, latitude, longitude, height } = coordinates;
  return units === 'degrees'
    ? Cartesian3.fromDegrees(longitude, latitude, height)
    : Cartesian3.fromRadians(longitude, latitude, height);
}

export function parseCameraRectangleCoordinates(coordinates: CameraRectangleCoordinates): Rectangle {
  const { units, north, south, west, east } = coordinates;
  return units === 'degrees'
    ? Rectangle.fromDegrees(west, south, east, north)
    : Rectangle.fromRadians(west, south, east, north);
}

export function parseVectorCoordinates(coordinates: CameraVectorCoordinates): Cartesian3 {
  if ('x' in coordinates && 'y' in coordinates && 'z' in coordinates) {
    return parseCartesianCoordinates(coordinates);
  }

  if ('units' in coordinates && 'latitude' in coordinates && 'longitude' in coordinates && 'height' in coordinates) {
    return parseCameraCartographicCoordinates(coordinates);
  }

  throw new TypeError('Invalid coordinates provided');
}

export function parseCameraCoordinates(coordinates: CameraCoordinates): Cartesian3 | Rectangle {
  if ('x' in coordinates && 'y' in coordinates && 'z' in coordinates) {
    return parseCartesianCoordinates(coordinates);
  }

  if ('units' in coordinates && 'latitude' in coordinates && 'longitude' in coordinates && 'height' in coordinates) {
    return parseCameraCartographicCoordinates(coordinates);
  }

  if (
    'units' in coordinates &&
    'north' in coordinates &&
    'south' in coordinates &&
    'west' in coordinates &&
    'east' in coordinates
  ) {
    return parseCameraRectangleCoordinates(coordinates);
  }

  throw new TypeError('Invalid coordinates provided');
}

export function parseCameraAngle(degrees = 0): number {
  return CesiumMath.convertLongitudeRange(CesiumMath.toRadians(degrees));
}

export function parseCameraOrientation(orientation: CameraOrientation): HeadingPitchRollValues | DirectionUp {
  if ('direction' in orientation) {
    const { direction, up } = orientation;
    return { direction: parseVectorCoordinates(direction), up: parseVectorCoordinates(up) };
  } else {
    const { heading, pitch, roll } = orientation;
    return { heading: parseCameraAngle(heading), pitch: parseCameraAngle(pitch || -90), roll: parseCameraAngle(roll) };
  }
}

export function parseCameraView(view: CameraView): CesiumView {
  const { destination, orientation } = view;
  const cesiumView: CesiumView = {
    destination: parseCameraCoordinates(destination)
  };
  if (orientation) {
    cesiumView.orientation = parseCameraOrientation(orientation);
  }
  return cesiumView;
}

export function parseCesiumCartesianView(cesiumView: CesiumCartesianView): CameraCartesianView {
  return {
    destination: { x: cesiumView.destination.x, y: cesiumView.destination.y, z: cesiumView.destination.z },
    orientation: {
      direction: {
        x: cesiumView.orientation.direction.x,
        y: cesiumView.orientation.direction.y,
        z: cesiumView.orientation.direction.z
      },
      up: { x: cesiumView.orientation.up.x, y: cesiumView.orientation.up.y, z: cesiumView.orientation.up.z }
    }
  };
}
