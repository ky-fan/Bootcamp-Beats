import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import trackReducer from "./track";
import albumReducer from "./album";
import playingTrackReducer from "./playingTrack";
import artistReducer from "./artist";

const rootReducer = combineReducers({
  session: sessionReducer,
  tracks: trackReducer,
  albums: albumReducer,
  playingTrack: playingTrackReducer,
  artist: artistReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
