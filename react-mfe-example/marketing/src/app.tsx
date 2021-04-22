import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { MemoryHistory } from 'history';

import Landing from './components/landing';
import Pricing from './components/pricing';

// to avoid name collision in production, we would prefix class names generated
const generateClassName = createGenerateClassName({
  productionPrefix: 'mrk'
});

interface MarketingAppProps {
  history: MemoryHistory
}

const MarketingApp = ({history}: MarketingAppProps) => {
  return (
    <div>
       <StylesProvider generateClassName={generateClassName}>
           <Router history={history}>
              <Switch>
                  <Route exact path='/pricing' component={Pricing} />
                  <Route exact path='/' component={Landing} />
              </Switch>
           </Router>
       </StylesProvider>
    </div>
  );
};

export default MarketingApp;