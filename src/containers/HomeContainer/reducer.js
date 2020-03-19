// @flow
import {FETCH_FAILED, PICTURES_FETCH_REQUESTED, PICTURES_FETCH_SUCCESS} from "./actions";

const initialState = {
  pictures: [],
  isLoading: true,
  page: 1,
  hasMore: false,
  errorMessage: '',
}

export default function (state: any = initialState, action: Object) {
  switch (action.type) {
    case (PICTURES_FETCH_REQUESTED):
      return {
        ...state,
        errorMessage: '',
        pictures: action.shouldClear ? [] : [...state.pictures],
        isLoading: true
      }
    case (PICTURES_FETCH_SUCCESS):
      return {
        ...state,
        isLoading: false,
        pictures: action.payload.page === 1 ? action.payload.pictures : [...state.pictures, ...action.payload.pictures],
        hasMore: action.payload.hasMore,
        page: action.payload.page
      }
    case (FETCH_FAILED):
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.errorMessage
      }
    default:
      return state;
  }
}
