import axios from 'axios';
import qs from 'qs';
import pkceChallenge from 'pkce-challenge';

const AUTH_SERVER = process.env.REACT_APP_AUTH_SERVER_BASE_URL;
const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const authServer = axios.create({
    baseURL: AUTH_SERVER,
});

authServer.interceptors.response.use(undefined, async (error) => {
    if (error.response?.status === 401) {
        AuthService.imperativelySendToLogout();
    }
    return Promise.reject(error);
});

export interface OAuthAuthorizationTokenResponse {
    access_token: string;
    token_type: 'bearer' | string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    [key: string]: string | number;
}

export default class AuthService {

    public static imperativelySendToLogout() {
        // window.localStorage.removeItem('accessToken');
        // limpa o localstorage somente do domínio da própria aplicação (obs: não limpa o localstorage de outros domínios, e se estiver usando o redux persist, limpará os dados dele)
        window.localStorage.clear();
        window.location.href = `${AUTH_SERVER}/logout?redirect=${APP_BASE_URL}`;
    }

    public static async getNewToken(config: {
        refreshToken: string;
        codeVerifier: string;
        scope?: string;
    }) {
        const formUrlEncoded = qs.stringify({
            refresh_token: config.refreshToken,
            code_verifier: config.codeVerifier,
            scope: config.scope,
            grant_type: 'refresh_token',
            client_id: 'alganews-cms'
        });

        return authServer.post<OAuthAuthorizationTokenResponse>('/oauth/token', formUrlEncoded, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => res.data);
    }

    public static async getFirstAccessTokens(config: {
        code: string,
        codeVerifier: string,
        redirectUri: string
    }) {
        const data = {
            code: config.code,
            code_verifier: config.codeVerifier,
            redirect_uri: config.redirectUri,
            grant_type: 'authorization_code',
            client_id: 'alganews-cms'
        }

        const encodedData = qs.stringify(data);

        // console.log('encodedData', encodedData);

        return authServer.post<OAuthAuthorizationTokenResponse>('/oauth/token', encodedData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => res.data);
    }

    public static getLoginScreenUrl (codeChallenge: string) {
        const config = qs.stringify({
            response_type: 'code',
            client_id: 'alganews-cms',
            redirect_uri: `${window.location.origin}/authorize`,
            code_challenge: codeChallenge,
            code_challenge_method: 'S256'
        })

        return `${AUTH_SERVER}/oauth/authorize?${config}`
    }

    public static async imperativelySendToLoginScreen () {
        const { code_challenge, code_verifier } = await pkceChallenge();
        this.setCodeVerifier(code_verifier);

        const loginUrl = this.getLoginScreenUrl(code_challenge)

        // imperativo
        // gera efeito colateral
        window.location.href = loginUrl
    }

    public static getAccessToken() {
        return window.localStorage.getItem('accessToken');
    }
    public static setAccessToken(token: string) {
        return window.localStorage.setItem('accessToken', token);
    }

    public static getRefreshToken() {
        return window.localStorage.getItem('refreshToken');
    }
    public static setRefreshToken(token: string) {
        return window.localStorage.setItem('refreshToken', token);
    }

    public static getCodeVerifier() {
        return window.localStorage.getItem('codeVerifier');
    }
    public static setCodeVerifier(getCodeVerifier: string) {
        return window.localStorage.setItem('codeVerifier', getCodeVerifier);
    }
}