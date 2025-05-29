import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import autenticarReducer from "../features/auth/authSlice";

const config = {
    key: "root",
    storage
};
const persistir = persistReducer(config, autenticarReducer);

export const store = configureStore({
    reducer: {
        autenticar: persistir
    },
    middleware: (getDeafultMiddleware) =>
        getDeafultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST"]
            }
        })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;