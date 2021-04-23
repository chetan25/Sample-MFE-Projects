import React, { useEffect, useRef } from 'react';
import { mountMarketing } from 'marketing/MarketingApp';
import { useHistory } from 'react-router-dom';

interface LocationProp {
    hash: string;
    key: string;
    pathname: string;
    search:string; 
}

const MarketingApp = () => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        if (ref.current) {
            const {onContainerNavigate} = mountMarketing(ref.current!, {
                onNavigate: ({ pathname: newPathName }: LocationProp) => {
                    const { pathname } = history.location;
                    // to prevent from going into infinite loop of updating route form different locations, we put a check
                    if (pathname !== newPathName) {
                        history.push(newPathName);
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

export default MarketingApp;