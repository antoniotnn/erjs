import { Route, Switch, useHistory, useLocation} from "react-router-dom";
import Home from "./views/Home.view";
import EditorsListView from "./views/EditorsList.view";
import EditorProfileView from "./views/EditorProfile.view";
import PostCreateView from "./views/PostCreate.view";
import NotFound404 from "./views/NotFound404.view";
import React, {useEffect, useMemo} from "react";
import info from "../core/utils/info";
import PostEditView from "./views/PostEdit.view";
import AuthService from "../auth/Authorization.service";
import {Authentication} from "../auth/Auth";
import useAuth from "../core/hooks/useAuth";
import Loading from "./components/Loading";
import jwtDecode from "jwt-decode";

export default function App() {
    const history = useHistory();
    const location = useLocation();

    const { fetchUser, user } = useAuth();

    useEffect(() => {
       window.onunhandledrejection = function (error: PromiseRejectionEvent) {
           // console.log(error);
           info({
               title: error.reason.response?.data.title || 'Erro',
               description: error.reason.response?.data.detail || error.reason.message
           });
       }
    }, []);

    useEffect(() => {
        async function identify() {
            const isInAuthorizationRoute = window.location.pathname === '/authorize';
            const code = new URLSearchParams(window.location.search).get('code');

            const codeVerifier = AuthService.getCodeVerifier();
            const accessToken = AuthService.getAccessToken();

            if (!accessToken && !isInAuthorizationRoute) {
                await AuthService.imperativelySendToLoginScreen();
            }

            if (isInAuthorizationRoute) {
                if (!code) {
                    info({
                        title: 'Erro',
                        description: 'Código de autorização não informado'
                    })
                    await AuthService.imperativelySendToLoginScreen();
                    return;
                }

                if (!codeVerifier) {
                    AuthService.imperativelySendToLogout();
                    return;
                }

                // busca o primeiro token de acesso
                const { access_token, refresh_token } = await AuthService.getFirstAccessTokens({
                    code,
                    codeVerifier,
                    redirectUri: 'http://localhost:3001/authorize'
                });

                AuthService.setAccessToken(access_token);
                AuthService.setRefreshToken(refresh_token);

                const decodedToken: Authentication.AccessTokenDecodedPayload = jwtDecode(access_token);
                fetchUser(decodedToken['alganews:user_id']);

                history.push('/');
            }

            if (accessToken) {
                const decodedToken: Authentication.AccessTokenDecodedPayload = jwtDecode(accessToken);
                fetchUser(decodedToken['alganews:user_id']);
            }
        }



        identify();
    }, [history, fetchUser]);

    const isAuthorizationRoute = useMemo(() => {
        return location.pathname === '/authorize'
    }, [location.pathname]);

    if (isAuthorizationRoute || !user) return <Loading show />

    return (
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/editores" exact component={EditorsListView}/>
            <Route path="/editores/:id" exact component={EditorProfileView}/>
            <Route path="/posts/criar" exact component={PostCreateView}/>
            <Route path="/posts/editar/:id" exact component={PostEditView}/>
            <Route component={NotFound404}/>
        </Switch>
    );


}