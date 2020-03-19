// @flow

import {getPictureDetails} from '../../services/500pxAPI'
import type { ActionWithPayload, ActionWithoutPayload } from '../../types/actions'

export const PICTURE_DETAILS_FETCH_REQUESTED = 'PICTURE_DETAILS_FETCH_REQUESTED'
export const PICTURE_DETAILS_FETCH_SUCCESS = 'PICTURE_DETAILS_FETCH_SUCCESS'
export const FETCH_FAILED = 'FETCH_FAILED'

export function pictureIsLoading (): ActionWithoutPayload {
  return {
    type: PICTURE_DETAILS_FETCH_REQUESTED,
  }
}

export function fetchPictureSuccess (hiResImage: string): ActionWithPayload {
  return {
    type: PICTURE_DETAILS_FETCH_SUCCESS,
    payload: {
      hiResImage
    }
  }
}

export function fetchPictureFailed (errorMessage: string): ActionWithPayload {
  return {
    type: FETCH_FAILED,
    payload: {
      errorMessage
    }
  }
}

export function fetchPictureDetails (imageId: number) {
  return async dispatch => {
    dispatch(pictureIsLoading);
    const resp = await getPictureDetails(imageId)
    if (resp && resp.status == 200) {
      dispatch(fetchPictureSuccess(resp.data));
    } else {
      dispatch(fetchPictureFailed(resp && resp.message || 'Something went wrong'))
    }
  }
}
