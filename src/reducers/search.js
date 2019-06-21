export function searchUpdated(params, entity) {
  return {
    type: 'SEARCH_TERM_UPDATED',
    payload: {
      entity,
      params,
    },
  };
}

/** Reducers */
export const searchReducer = (state = { searchParams: {} }, action) => {
  switch (action.type) {
    case 'SEARCH_TERM_UPDATED':
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          [action.payload.entity]: action.payload.params,
        },
      };
    default:
      return state;
  }
};
