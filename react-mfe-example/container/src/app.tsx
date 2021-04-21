import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import MarketingApp from './components/marketing-app';
import Header from './components/header';

// to avoid name collision in production, we would prefix class names generated
const generateClassName = createGenerateClassName({
  productionPrefix: 'hst'
});

const App = () => {
    return (
      <BrowserRouter>
        <StylesProvider generateClassName={generateClassName}>
          <div>
            <Header signedIn={false} onSignOut={() => {}}/>
            <MarketingApp />
          </div>
        </StylesProvider>
      </BrowserRouter>
    );
};

export default App;