import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

// mounts the Marketing App
const mountMarketing = (element: HTMLElement) => {
    /** RENDER TO DOM **/
    ReactDOM.render(
        <App />,
        element
    );
}

// check for running in development mode, used for standalone
if (process.env.NODE_ENV === 'development') {
    const element = document.querySelector('#marketing-dev') as HTMLElement;
    if (element) {
        mountMarketing(element);
    }
}

// used by Container 
export { mountMarketing };