import {createStore} from 'redux'
import {app} from './reducers'
import {setArticleToUpdate} from './actions'

let store = createStore(app)

export default store
// store.dispatch(setArticleToUpdate({
//   title: 'hello',
//   content: 'world'
// }))
//
// console.log(store.getState())
//
