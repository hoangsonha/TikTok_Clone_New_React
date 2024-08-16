import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer = combineReducers({
    authReducer,
});

const config = {
    key: 'root',
    storage,
    whiteList: [authReducer],
    blackList: [],
};

// white vaf black : cái nào lưu, cái nào k lưu

const persistReducers = persistReducer(config, rootReducer);

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

export const store = createStore(persistReducers, reduxDevTools(applyMiddleware(thunk)));

export const persisStore = persistStore(store);
