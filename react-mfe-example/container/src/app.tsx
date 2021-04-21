import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MarketingApp from './components/marketing-app';
import Header from './components/header';

const App = () => {
    return (
      <BrowserRouter>
       <div>
        <Header signedIn={false} onSignOut={() => {}}/>
        <MarketingApp />
      </div>
      </BrowserRouter>
    );
};

export default App;