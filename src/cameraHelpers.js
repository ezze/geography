import Cesium from 'cesium';

export function parseCoordinates(object, defaultValue) {
  if (defaultValue === undefined) {
    defaultValue = object;
  }

  if (!object || typeof object !== 'object' || typeof object.type !== 'string' || !object.value) {
    return defaultValue;
  }

  const type = object.type;
  const value = object.value;

  if (type === 'cartesian') {
    return Cesium.Cartesian3.fromArray(object.value);
  }

  if (type === 'cartographic') {
    if (typeof value.longitude === 'number' && typeof value.latitude === 'number') {
      return Cesium.Cartesian3.fromRadians(value.longitude, value.latitude, value.height);
    }
    return defaultValue;
  }

  if (type === 'cartographicDegrees') {
    if (typeof value.longitude === 'number' && typeof value.latitude === 'number') {
      return Cesium.Cartesian3.fromDegrees(value.longitude, value.latitude, value.height);
    }
    return defaultValue;
  }

  return defaultValue;
}

export function parseAngle(object, defaultValue) {
  if (defaultValue === undefined) {
    defaultValue = object;
  }

  let value;
  if (object && typeof object === 'object' && typeof object.type === 'string' && typeof object.value === 'number') {
    value = object.type === 'degrees' ? Cesium.Math.toRadians(object.value) : object.value;
  }
  else {
    value = object;
  }

  return typeof value === 'number' ? Cesium.Math.convertLongitudeRange(value) : defaultValue;
}

export function parseView(object, defaultValue) {
  if (defaultValue === undefined) {
    defaultValue = object;
  }

  if (!object.destination || typeof object.destination !== 'object') {
    return defaultValue;
  }

  const view = {
    destination: parseCoordinates(object.destination)
  };

  if (object.orientation && typeof object.orientation === 'object') {
    const { orientation } = object;
    const { direction, up, heading, pitch, roll } = orientation;
    if (direction && typeof direction === 'object' && up && typeof up === 'object') {
      view.orientation = {
        direction: parseCoordinates(direction),
        up: parseCoordinates(up)
      };
    }
    else if (heading !== undefined || pitch !== undefined || roll !== undefined) {
      view.orientation = {
        heading: parseAngle(heading, 0.0),
        pitch: parseAngle(pitch, Cesium.Math.toRadians(-90.0)),
        roll: parseAngle(roll, 0.0)
      };
    }
  }

  return view;
}
