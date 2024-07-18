import Icon from "@mdi/react";
import {useEffect, useMemo, useState} from "react";
import {Column, usePagination, useTable} from "react-table";
import {mdiOpenInNew} from "@mdi/js";
import Table from "../components/Table/Table";
import {format} from "date-fns";
import Skeleton from "react-loading-skeleton";
import Loading from "../components/Loading";
import PostPreview from "./PostPreview";
import modal from "../../core/utils/modal";
import PostTitleAnchor from "../components/PostTitleAnchor";
import {Post} from "tnn-sdk";
import usePosts from "../../core/hooks/usePosts";


export default function PostsList() {

    const { loading, paginatedPosts, fetchPosts } = usePosts();
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetchPosts({
            page,
            size: 7,
            showAll: true,
            sort: ["createdAt", "desc"],
        })
    }, [fetchPosts, page]);

    const columns = useMemo<Column<Post.Summary>[]>(
        () => [
            {
                Header: '',
                accessor: 'id', // accessor is the "key" in the data
                Cell: () => <Icon path={mdiOpenInNew} size={'14px'} color={'#09f'} />
            },
            {
                Header: () => <div style={{ textAlign: 'left' }}>Título</div>,
                accessor: 'title',
                width: 320,
                Cell: (props) => (
                    <div
                        style={{
                            textAlign: 'left',
                            display: 'flex',
                            gap: 8,
                            alignItems: 'center',
                            maxWidth: 270
                        }}
                    >
                        <img
                            width={24}
                            height={24}
                            src={props.row.original.editor.avatarUrls.small}
                            alt={props.row.original.editor.name}
                            title={props.row.original.editor.name}
                        />
                        <PostTitleAnchor
                            title={props.value}
                            href={`/posts/${props.row.original.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                modal({
                                    children: <PostPreview postId={props.row.original.id} />,
                                });
                            }}
                        >
                            {props.value}
                        </PostTitleAnchor>
                    </div>
                )
            },
            {
                Header: () => <div style={{textAlign: 'right'}}>Criação</div>,
                accessor: 'createdAt',
                Cell: (props) => <div
                    style={{
                        textAlign: 'right',
                        fontFamily: '"Roboto mono", monospace'
                    }}
                    >
                    { format(new Date(props.value), 'dd/MM/yyyy') }
                </div>
            },
            {
                Header: () => <div style={{ textAlign: 'right' }}>Última atualização</div>,
                accessor: 'updatedAt',
                Cell: (props) => <div
                    style={{
                        textAlign: 'right',
                        fontFamily: '"Roboto mono", monospace'
                    }}
                >
                    { format(new Date(props.value), 'dd/MM/yyyy') }
                </div>
            },
            {
                id: Math.random().toString(),
                accessor: 'published',
                Header: () => <div style={{ textAlign: 'right' }}>Ações</div>,
                Cell: (props) => <div style={{ textAlign: 'right' }}>
                    {
                        props.value ? 'Publicado' : 'Privado'
                    }
                </div>
            },
        ],
        []
    );

    const instance = useTable<Post.Summary>(
        {
            data: paginatedPosts?.content || [],
            columns,
            manualPagination: true,
            initialState: { pageIndex: 0 },
            pageCount: paginatedPosts?.totalPages,
        },
        usePagination
    );

    if (!paginatedPosts) {
        return <div>
            <Skeleton height={32}/>
            <Skeleton height={40}/>
            <Skeleton height={40}/>
            <Skeleton height={40}/>
            <Skeleton height={40}/>
            <Skeleton height={40}/>
            <Skeleton height={40}/>
            <Skeleton height={40}/>
        </div>
    }

    return <>
        <Loading show={loading} />
        <Table
            instance={instance}
            onPaginate={setPage}
        />
    </>


}