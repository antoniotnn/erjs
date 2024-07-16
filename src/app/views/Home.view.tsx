import usePageTitle from "../../core/hooks/usePageTitle";
import DefaultLayout from "../layouts/default";
import PostsList from "../features/PostsList";
import UserPerformance from "../features/UserPerformance";
import UserTopTags from "../features/UserTopTags";
import UserEarnings from "../features/UserEarnings";
import ErrorBoundary from "../components/ErrorBoundary";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {addPost, fetchPosts} from "../../core/store/Post.slice";
import {RootState} from "../../core/store";
import selectPaginatedPosts from "../../core/selectors/selectPaginatedPosts";


const fakePost = {
    id: 42,
    slug: "como-fazer-x-coisas-com-react-js",
    title: "Como fazer X coisas com React.js",
    imageUrls: {
        default:
            "https://storage.googleapis.com/alganews-files/posts/avatar-joao.jpeg",
        small:
            "https://storage.googleapis.com/alganews-files/posts/avatar-joao-small.jpeg",
        medium:
            "https://storage.googleapis.com/alganews-files/posts/avatar-joao-medium.jpeg",
        large:
            "https://storage.googleapis.com/alganews-files/posts/avatar-joao-large.jpeg",
    },
    editor: {
        id: 29,
        name: "Daniel Bonifacio",
        avatarUrls: {
            default:
                "https://storage.googleapis.com/alganews-files/posts/avatar-joao.jpeg",
            small:
                "https://storage.googleapis.com/alganews-files/posts/avatar-joao-small.jpeg",
            medium:
                "https://storage.googleapis.com/alganews-files/posts/avatar-joao-medium.jpeg",
            large:
                "https://storage.googleapis.com/alganews-files/posts/avatar-joao-large.jpeg",
        },
        createdAt: "2017-03-04T00:12:45Z",
    },
    createdAt: "2020-12-04T00:12:45-03:00",
    updatedAt: "2020-12-05T00:12:45-03:00",
    published: true,
    tags: ["JavaScript"],
    canBePublished: true,
    canBeUnpublished: true,
    canBeDeleted: true,
    canBeEdited: true,
};


export default function Home() {
    usePageTitle('Home');

    const dispatch = useDispatch();

    const paginatedPosts = useSelector(selectPaginatedPosts);

    useEffect(() => {
        dispatch(addPost(fakePost))
    }, [dispatch]);

    return <DefaultLayout>
        <button onClick={() => {
            dispatch(fetchPosts({ page: 0 }))
        }}>
            Disparar Ação
        </button>
        {
            paginatedPosts?.map(post => <li key={post.id}>{post.title}</li>)
        }
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