export function modalOpen(key) {
  return { type: 'MODAL_OPEN', payload: key };
}

export function modalClose(key) {
  return { type: 'MODAL_CLOSE', payload: key };
}

export function modalToggle(key) {
  return { type: 'MODAL_TOGGLE', payload: key };
}

/** Reducers */
export const modalReducer = (state = {}, action) => {
  switch (action.type) {
    case 'MODAL_OPEN':
      return { ...state, [action.payload]: true };
    case 'MODAL_CLOSE':
      return { ...state, [action.payload]: false };
    case 'MODAL_TOGGLE':
      return { ...state, [action.payload]: !state[action.payload] };
    default:
      return state;
  }
};
