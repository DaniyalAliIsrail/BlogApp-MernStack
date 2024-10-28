import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import themeReducer from './theme/themeSlice'
import { persistReducer, persistStore,  } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  theme:themeReducer,
});

const persistConfig = {
  key:'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middlewear: (getDefaultMiddleware) => {
//     getDefaultMiddleware({ serializableCheck: false })
//   },
// });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Optionally, you can ignore specific actions
        ignoredPaths: ['somePath'], // Optionally, you can ignore specific paths in the state
      },
    }),
});

export const persistor = persistStore(store);