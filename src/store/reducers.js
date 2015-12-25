import {
  SET_ARTICLE_TO_UPDATE,
  setArticleToUpdate
} from './actions'

export function app(state = {}, action) {
  switch (action.type) {
  case SET_ARTICLE_TO_UPDATE:
    return Object.assign({}, state, action.article)
  default:
    return state
  }
}
