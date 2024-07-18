import styled from "styled-components";
import Profile from "../components/Profile";
import {useEffect} from "react";
import Skeleton from "react-loading-skeleton";
import {getEditorDescription} from "tnn-sdk";
import useEditors from "../../core/hooks/useEditors";

export default function EditorsList() {


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {editorsList, loading, fetchAllEditors} = useEditors();

    useEffect(() => {
        fetchAllEditors();
    }, [fetchAllEditors]);

    if (!editorsList.length) {
        return <EditorsListWrapper>
            <Skeleton height={82}  />
            <Skeleton height={82}  />
            <Skeleton height={82}  />
        </EditorsListWrapper>
    }

    return (
        <EditorsListWrapper>
            {
                editorsList.map((editor) => {
                    return <Profile
                        key={editor.id}
                        editorId={editor.id}
                        name={editor.name}
                        description={getEditorDescription(new Date(editor.createdAt))}
                        avatarUrl={editor.avatarUrls.small}
                    />
                })
            }

        </EditorsListWrapper>
    );
}

const EditorsListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
`;