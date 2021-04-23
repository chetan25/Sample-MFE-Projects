import React, { useEffect, useRef } from 'react';
import { mountAuth } from 'auth/AuthApp';
import { useHistory } from 'react-router-dom';

interface LocationProp {
    hash: string;
    key: string;
    pathname: string;
    search:string; 
}

const AuthApp = ({onSignIn}: {onSignIn: (email: string) => void}) => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        if (ref.current) {
            const {onContainerNavigate} = mountAuth(ref.current!, {
                onNavigate: ({ pathname: newPathName }: LocationProp) => {
                    const { pathname } = history.location;
                    // to prevent from going into infinite loop of updating route form different locations, we put a check
                    if (pathname !== newPathName) {
                        history.push(newPathName);
                    }
                },
                onAuthChange: (email: string | null) => {
                    if (email) {
                      onSignIn(email);
                      history.push('/');
                    }
                },
                initialPath: history.location.pathname
            });
    
            history.listen(onContainerNavigate);
        }
    }, []);

    return (
        <div ref={ref}></div>
    );
};

export default AuthApp;