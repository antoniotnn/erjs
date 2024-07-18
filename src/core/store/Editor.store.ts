import {createAsyncThunk, createReducer, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import {User, UserService} from "tnn-sdk";

export const fetchAllEditors = createAsyncThunk(
    'editor/fetchAllEditors',
    async () => {
        return UserService.getAllEditors();
    }
);

interface EditorStoreState {
    fetching: boolean;
    editorsList: User.EditorSummary[];
}

const initialState: EditorStoreState = {
    fetching: false,
    editorsList: [],
};

export const editorReducer = createReducer(initialState, (builder) => {
    const pending = isPending(fetchAllEditors);
    const rejected = isRejected(fetchAllEditors);
    const fullFilled = isFulfilled(fetchAllEditors);

    builder
        .addCase(fetchAllEditors.fulfilled, (state, action) => {
            state.editorsList = action.payload;
        })
        .addMatcher(pending, (state) => {
            state.fetching = true;
        })
        .addMatcher(rejected, (state) => {
            state.fetching = false;
        })
        .addMatcher(fullFilled, (state) => {
            state.fetching = false;
        });

});