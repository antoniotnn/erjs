import usePageTitle from "../../core/hooks/usePageTitle";
import DefaultLayout from "../layouts/default";
import PostsList from "../features/PostsList";
import UserPerformance from "../features/UserPerformance";
import UserTopTags from "../features/UserTopTags";
import UserEarnings from "../features/UserEarnings";
import ErrorBoundary from "../components/ErrorBoundary";
import usePosts from "../../core/hooks/usePosts";
import {useEffect} from "react";


export default function Home() {
    usePageTitle('Home');

    const { paginatedPosts, loading, fetchPosts } = usePosts();

    useEffect(() => {
        fetchPosts({ page: 1 });
    }, [fetchPosts]);


    return <DefaultLayout>
        {loading ? 'carregando...' : 'finalizado'}
        <hr />
        {paginatedPosts?.map((post) => (
            <li key={post.id}>{post.title}</li>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 32 }}>
            <UserTopTags />
            <UserEarnings />
        </div>
        <UserPerformance />
        <ErrorBoundary component={'lista de posts'}>
            <PostsList />
        </ErrorBoundary>
    </DefaultLayout>
}