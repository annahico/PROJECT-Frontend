import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../pages/userSlice";

//storage es de redux-persist para que la información no se pierda en una eventual recarga
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import thunk from "redux-thunk";
import designSlice from "../pages/designSlice";

import paymentSlice from "../pages/paymentSlice";

const reducers = combineReducers({
    user: userSlice,
    design: designSlice,
    payment: paymentSlice,
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});
