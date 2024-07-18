import { configureStore } from "@reduxjs/toolkit";
import {postReducer} from "./Post.slice";
import {userReducer} from "./User.slice";
import {editorReducer} from "./Editor.store";

const store = configureStore({
    reducer: {
        post: postReducer,
        user: userReducer,
        editor: editorReducer
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;