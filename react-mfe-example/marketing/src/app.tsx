import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Landing from './components/landing';
import Pricing from './components/pricing';

// to avoid name collision in production, we would prefix class names generated
const generateClassName = createGenerateClassName({
  productionPrefix: 'mrk'
});

const MarketingApp = () => {
  return (
    <div>
       <StylesProvider generateClassName={generateClassName}>
           <BrowserRouter>
              <Switch>
                  <Route exact path='/pricing' component={Pricing} />
                  <Route exact path='/' component={Landing} />
              </Switch>
           </BrowserRouter>
       </StylesProvider>
    </div>
  );
};

export default MarketingApp;