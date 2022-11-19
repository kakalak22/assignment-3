import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import rootReducer from "./rootReducer";
import rootWatcher from "./rootWatcher";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['reducersearchResults', 'reducerMyCart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const saga = createSagaMiddleware();
const middleWares = [saga];
const store = createStore(persistedReducer, applyMiddleware(...middleWares));

saga.run(rootWatcher);

export default store;
export const persistor = persistStore(store);