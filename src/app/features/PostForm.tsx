import styled from "styled-components";
import Input from "../components/Input/Input";
import ImageUpload from "../components/ImageUpload";
import MarkdownEditor from "../components/MarkdownEditor";
import TagInput from "../components/TagInput";
import React, {useEffect, useState} from "react";
import {Tag} from "react-tag-input";
import WordPriceCounter from "../components/WorldPriceCounter";
import Button from "../components/Button/Button";
import countWordsInMarkdown from "../../core/utils/countWordsInMarkdown";
import {info} from "../../core/utils/info";
import Loading from "../components/Loading";
import {useHistory} from "react-router-dom";
import { PostService } from "tnn-sdk";

interface PostFormProps {
    postId?: number
}

export default function PostForm(props: PostFormProps) {
    const history = useHistory();

    const [tags, setTags] = useState<Tag[]>([]);
    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const [publishing, setPublishing] = useState(false);

    async function insertNewPost() {
        const newPost = {
            body, title, tags: tags.map(tag => tag.text), imageUrl
        }

        await PostService.insertNewPost(newPost);

        info({
            title: 'Post salvo com sucesso',
            description: 'Você acabou de criar o post'
        });
    }

    async function updateExistingPost(postId: number) {
        const newPost = {
            body, title, tags: tags.map(tag => tag.text), imageUrl
        }

        await PostService.updateExistingPost(postId, newPost);

        info({
            title: 'Post atualizado',
            description: 'Você atualizou o post com sucesso'
        });
    }


    async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {

        try {
            e.preventDefault();
            setPublishing(true);

            props.postId
                ? await updateExistingPost(props.postId)
                : await insertNewPost();

            history.push('/');
        } finally {
            setPublishing(false);
        }

    }

    function fetchPost(postId: number) {
        PostService
            .getExistingPost(postId)
            .then(post => {
                setTitle(post.title);
                setImageUrl(post.imageUrls.default)
                setBody(post.body)
                setTags(post.tags.map(tag => ({ id: tag, text: tag })))
            });
    }

    useEffect(() => {
        if (props.postId) fetchPost(props.postId);
    }, [props.postId]);

    return <PostFormWrapper onSubmit={handleFormSubmit}>
        <Loading show={publishing} />

        <Input
            label="título"
            value={title}
            onChange={e => setTitle(e.currentTarget.value)}
            placeholder="e.g.: Como fiquei rico aprendendo React"
        />
        <ImageUpload
            onImageUpload={setImageUrl}
            label="Thumbnail do post"
            preview={imageUrl}
        />
        <MarkdownEditor
            onChange={setBody}
            value={body}
        />
        <TagInput
            tags={tags}
            onAdd={tag => setTags([...tags, tag])}
            onDelete={index => setTags(tags.filter((_, i) => i !== index))}
            placeholder="Insira as tags deste post"
        />
        <PostFormSubmitWrapper>
            <WordPriceCounter
                wordsCount={countWordsInMarkdown(body)}
                pricePerWord={0.10}
            />
            <Button
                variant="primary"
                label="Salvar post"
                type="submit"
                disabled={!title || !imageUrl || !body || !tags.length}
            />
        </PostFormSubmitWrapper>
    </PostFormWrapper>
}

const PostFormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const PostFormSubmitWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;