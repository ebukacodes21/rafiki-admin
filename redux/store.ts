import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
    authReducer,
    initializeUserFromLocalStorage,
} from './features'

const reducer = combineReducers({
    authReducer,
})

export const store = configureStore({
    reducer,
})

store.dispatch(initializeUserFromLocalStorage())

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch