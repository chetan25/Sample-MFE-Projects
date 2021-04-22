import React, {Suspense, lazy, useState}  from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

const MarketingApp = lazy(() => import('./components/marketing-app'));
const AuthApp = lazy(() => import('./components/auth-app'));

import Header from './components/header';
import Loader from './components/loader';

// to avoid name collision in production, we would prefix class names generated
const generateClassName = createGenerateClassName({
  productionPrefix: 'hst'
});

const App = () => {
  const [isSignedIn, setSignedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string|undefined>();

    const handleSignIn = (email: string) => {
      setSignedIn(true);
      setUserEmail(email);
    }

    return (
      <BrowserRouter>
        <StylesProvider generateClassName={generateClassName}>
          <div>
              <Header signedIn={isSignedIn} onSignOut={() => {}} userEmail={userEmail}/>
              <Suspense fallback={<Loader />}>
                <Switch>
                  <Route path='/auth'>
                    <AuthApp onSignIn={handleSignIn}/>
                  </Route>
                  <Route path='/' component={MarketingApp} />
                </Switch>
              </Suspense> 
          </div>
        </StylesProvider>
      </BrowserRouter>
    );
};

export default App;