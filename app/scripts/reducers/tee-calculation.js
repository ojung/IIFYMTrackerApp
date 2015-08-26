import {
  UPDATE_WEIGHT,
  UPDATE_HEIGHT,
  UPDATE_AGE,
  UPDATE_SEX,
  UPDATE_PHYSICAL_ACTIVITY_FACTOR,
} from '../actions/tee-calculation';

export function age(state = null, action) {
  if (action.type === UPDATE_AGE) {
    return Number(action.age);
  }
  return state;
}

export function weight(state = null, action) {
  if (action.type === UPDATE_WEIGHT) {
    return Number(action.weight);
  }
  return state;
}

export function height(state = null, action) {
  if (action.type === UPDATE_HEIGHT) {
    return Number(action.height);
  }
  return state;
}

export function sex(state = null, action) {
  if (action.type === UPDATE_SEX) {
    return action.sex;
  }
  return state;
}

export function physicalActivityFactor(state = null, action) {
  if (action.type === UPDATE_PHYSICAL_ACTIVITY_FACTOR) {
    return Number(action.physicalActivityFactor);
  }
  return state;
}
