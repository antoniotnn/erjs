import DefaultLayout from '../layouts/default';
import usePageTitle from '../../core/hooks/usePageTitle';
import PostForm from "../features/PostForm";
import {useParams} from "react-router-dom";

export default function PostEditView() {
    const params = useParams<{ id: string }>();
    usePageTitle('Editar post');

    return <DefaultLayout>
        <PostForm postId={Number(params.id)} />
    </DefaultLayout>
}