import {RootState} from "../store";

export function selectPostsCounter(state: RootState) {
    return state.post.counter;
}