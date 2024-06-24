import { configureStore } from "@reduxjs/toolkit";
import { redusers } from './Slice'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const global_storePersistConfig = {
  key: 'global_store',
  storage: storage,
  blacklist: ['filter']
};

const persistedReducer = persistReducer(global_storePersistConfig, redusers);
export const store = configureStore({
  reducer: {
    global_store: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})
const pers = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type TypedDispatch = typeof store.dispatch