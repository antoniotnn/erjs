import React from "react";
import * as DL from './Default.layout.styles';
import NavBar from "../../components/NavBar";
import Logo from "../../components/Logo";
import SessionController from "../../components/SessionController";
import confirm from "../../../core/utils/confirm";
import info from "../../../core/utils/info";

interface DefaultLayoutProps {
    children: React.ReactNode;
}

function DefaultLayout(props: DefaultLayoutProps) {
    return <DL.Wrapper>
        <DL.Header>
            <Logo />
        </DL.Header>
        <DL.Main>
            <DL.Navigation>
                <NavBar />
            </DL.Navigation>
            <DL.FeaturedContent>
                { props.children }
            </DL.FeaturedContent>
            <DL.Aside>
                <SessionController
                    name="Daniel Bonifácio"
                    description="editor há 2 anos"
                    onLogout={() => {
                        confirm({
                            title: 'Você quer deslogar?',
                            onConfirm: () => {
                                info({
                                    title: 'Você foi deslogado',
                                    description: 'Você será redirecionado para a página de login'
                                });
                                console.log('executado');

                            },
                            onCancel: () => window.alert('laranja'),
                        })
                    }}
                />
            </DL.Aside>
        </DL.Main>
    </DL.Wrapper>
}

export default DefaultLayout;