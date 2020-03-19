import { getPictures } from '../../services/500pxAPI'
import type { ActionWithPayload, ActionWithoutPayload } from '../../types/actions'

export const PICTURES_FETCH_REQUESTED = 'PICTURES_FETCH_REQUESTED'
export const PICTURES_FETCH_SUCCESS = 'PICTURES_FETCH_SUCCESS'
export const FETCH_FAILED = 'FETCH_FAILED'

export function listIsLoading (): ActionWithoutPayload {
  return {
    type: PICTURES_FETCH_REQUESTED,
  }
}

export function fetchListSuccess (pictures: Array<Object>, page: number, hasMore: boolean): ActionWithPayload {
  return {
    type: PICTURES_FETCH_SUCCESS,
    payload: {
      pictures,
      page,
      hasMore
    }
  }
}

export function fetchListFailed (errorMessage: string): ActionWithPayload {
  return {
    type: FETCH_FAILED,
    payload: {
      errorMessage
    }
  }
}

export function fetchPictures (page: number = 1) {
  return async dispatch => {
    dispatch(listIsLoading);
    const resp = await getPictures(page)
    if (resp && resp.status == 200) {
      dispatch(fetchListSuccess(resp.data.pictures, resp.data.page, resp.data.hasMore));
    } else {
      dispatch(fetchListFailed(resp && resp.message || 'Something went wrong'))
    }
  }
}
