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
    defaultHistory?: any;
    initialPath?: string;
    onAuthChange?: (email: string | null) => void;
}

// mounts the Marketing App
const mountAuth = (element: HTMLElement, options?: MountOptions) => {
    const history = options?.defaultHistory ? options.defaultHistory : createMemoryHistory({
        // since we don't have a starting route as '/' in auth app we need to configure it to assume it's starting point
        initialEntries: [options?.initialPath || '/auth/signin']
    });

    if (options) {
        history.listen(options.onNavigate);
    }
    const fallbackAuthFn = (email: string | null) => {};
    
    /** Render to DOM **/
    ReactDOM.render(
        <AuthApp history={history} onAuthChange={options!.onAuthChange || fallbackAuthFn}/>,
        element
    );

    // for container to update marketing app
    return {
        onContainerNavigate({pathname: newContainerPath}: LocationProp) {
            const { pathname } = history.location;
            console.log('container navigated auth', newContainerPath.replace, pathname);
            if (pathname !== newContainerPath) {
                history.push(newContainerPath);
            }
        }
    }
}

// check for running in development mode, used for standalone
if (process.env.NODE_ENV === 'development') {
    const history = createBrowserHistory();
    const element = document.querySelector('#auth-dev') as HTMLElement;
    if (element) {
    console.log('element', history);
      
        mountAuth(element, {defaultHistory: history});
    }
}

// used by Container App to load the Micro FE
export { mountAuth };