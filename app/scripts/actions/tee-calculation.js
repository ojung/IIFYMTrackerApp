export const UPDATE_HEIGHT = 'UPDATE_HEIGHT';
export const UPDATE_WEIGHT = 'UPDATE_WEIGHT';
export const UPDATE_AGE = 'UPDATE_AGE';
export const UPDATE_SEX = 'UPDATE_TEXT_SEX';
export const UPDATE_PHYSICAL_ACTIVITY_FACTOR =
  'UPDATE_PHYSICAL_ACTIVITY_FACTOR';

export function updateWeight(weight) {
  return {
    weight,
    type: UPDATE_WEIGHT,
  };
}

export function updateHeight(height) {
  return {
    height,
    type: UPDATE_HEIGHT,
  };
}

export function updateAge(age) {
  return {
    age,
    type: UPDATE_AGE,
  };
}

export function updateSex(sex) {
  return {
    sex,
    type: UPDATE_SEX,
  };
}

export function updatePhysicalActivityFactor(physicalActivityFactor) {
  return {
    physicalActivityFactor,
    type: UPDATE_PHYSICAL_ACTIVITY_FACTOR,
  };
}

