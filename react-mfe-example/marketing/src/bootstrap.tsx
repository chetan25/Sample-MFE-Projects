import React from 'react';
import ReactDOM from 'react-dom';

// mounts the Marketing App
const mountMarketing = (element: HTMLElement) => {
    /** RENDER TO DOM **/
    ReactDOM.render(
        <h1>Hi There</h1> ,
        element
    );
}

// check for running in development
if (process.env.NODE_ENV === 'development') {
    const element = document.querySelector('#marketing-dev') as HTMLElement;
    if (element) {
        mountMarketing(element);
    }
}

export default mountMarketing;