import '@testing-library/react';
import {AppStore, createAppStore} from '../core/store';
import {fetchPosts} from "../core/store/Post.slice";

describe('PostSlice', () => {

    let store: AppStore;

    beforeEach(() => {
        store = createAppStore();
    });

    // unitário
    it('start with empty array on content', () => {
        const state = store.getState().post;
        expect(state.paginated?.content).toHaveLength(0);
    });

    // integração
    it('updates state after fetchPosts dispatch', async () => {
        await store.dispatch(fetchPosts({}));
        const state = store.getState().post;
        expect(state.paginated?.content?.length).toBeGreaterThanOrEqual(1);
    });
});

