import {PICTURE_DETAILS_FETCH_REQUESTED, PICTURE_DETAILS_FETCH_SUCCESS, FETCH_FAILED} from "./actions";

const initialState = {
  hiResPictures: [],
  isLoading: false,
  errorMessage: '',
}

export default function (state: any = initialState, action: Object) {
  switch (action.type) {
    case (PICTURE_DETAILS_FETCH_REQUESTED):
      return {
        ...state,
        isLoading: true,
        errorMessage: ''
      }
    case (PICTURE_DETAILS_FETCH_SUCCESS):
      return {
        ...state,
        isLoading: false,
        hiResPictures: [...state.hiResPictures, action.payload.hiResImage]
      }
    case (FETCH_FAILED):
      return {
        ...state,
        isLoading: false,
        errorMessage: ''
      }
    default:
      return state;
  }
}
