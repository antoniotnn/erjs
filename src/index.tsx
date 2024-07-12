import React from 'react';
import ReactDOM from 'react-dom';
import './core/imports.css';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from "./core/globalStyles";
import App from "./app";


ReactDOM.render(
    <React.StrictMode>
        <App />
        <GlobalStyles />
    </React.StrictMode>,
    document.getElementById('root')
);

// async function getDataFromApi() {

    // try {
    //     const response = await fetch('http://localhost:8080/posts', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             title: 'Olá mundo',
    //             body: 'Lorem ipsum dolor sit amet',
    //         })
    //     });
    //     console.log('Response: ',  response);
    //     if (response.status >= 400) {
    //         throw new Error(await response.json());
    //     }
    //     const posts = await response.json();
    //     console.error('Sucesso');
    //     console.log(posts);
    // } catch (error: any) {
    //     console.error('Houve erro');
    //     console.error(error.message);
    // }

    // Faz o mesmo que o código acima.
    // fetch('http://localhost:8080/posts')
    //     .then(res => res.json())
    //     .then(posts => {
    //         console.log(posts);
    //     })
    //     .catch(error => {
    //         console.log(error.message);
    //     });
// }

// getDataFromApi();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
