import React, { useEffect, useRef } from 'react';
import { mountMarketing } from 'marketing/MarketingApp'


const MarketingApp = () => {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            mountMarketing(ref.current!);
        }
    }, []);

    return (
        <div ref={ref}></div>
    );
};

export default MarketingApp;