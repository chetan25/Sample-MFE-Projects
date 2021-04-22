import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import AuthApp from './app';

interface LocationProp {
    hash: string;
    key: string;
    pathname: string;
    search:string; 
}

interface MountOptions {
    onNavigate?:  () => void;
    defaultHistory?: any
}

// mounts the Marketing App
const mountAuth = (element: HTMLElement, options?: MountOptions) => {
    const history = options?.defaultHistory ? options.defaultHistory : createMemoryHistory();

    if (options) {
        history.listen(options.onNavigate);
    }
    /** Render to DOM **/
    ReactDOM.render(
        <AuthApp history={history}/>,
        element
    );

    // for container to update marketing app
    return {
        onContainerNavigate({pathname: newContainerPath}: LocationProp) {
            const { pathname } = history.location;
            if (pathname !== newContainerPath) {
                console.log('container navigated');
                history.push(newContainerPath);
            }
        }
    }
}

// check for running in development mode, used for standalone
if (process.env.NODE_ENV === 'development') {
    const history = createBrowserHistory();
    const element = document.querySelector('#auth-dev') as HTMLElement;
    console.log('element');
    if (element) {
      
        mountAuth(element, {defaultHistory: history});
    }
}

// used by Container App to load the Micro FE
export { mountAuth };