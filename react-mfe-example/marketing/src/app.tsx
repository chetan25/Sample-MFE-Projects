import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';

import Landing from './components/landing';
import Pricing from './components/pricing';

const MarketingApp = () => {
  return (
    <div>
       <StylesProvider>
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