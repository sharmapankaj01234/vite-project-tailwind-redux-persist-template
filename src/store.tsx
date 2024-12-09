import { combineReducers, configureStore } from '@reduxjs/toolkit'

import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { counterSlice } from './feature/counter/counterSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
    counter: counterSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
    },
  }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch